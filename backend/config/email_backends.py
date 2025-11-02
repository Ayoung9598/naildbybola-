"""
Custom email backend using Resend API (works with Render free tier - no SMTP needed).
"""
import logging
from django.core.mail.backends.base import BaseEmailBackend
from django.conf import settings
from django.template.loader import render_to_string

logger = logging.getLogger(__name__)

try:
    import resend
except ImportError:
    resend = None


class ResendEmailBackend(BaseEmailBackend):
    """Email backend using Resend API instead of SMTP."""
    
    def __init__(self, fail_silently=False, **kwargs):
        super().__init__(fail_silently=fail_silently, **kwargs)
        self.resend_api_key = getattr(settings, 'RESEND_API_KEY', None)
        self.from_email = getattr(settings, 'DEFAULT_FROM_EMAIL', 'noreply@naildbybola.com')
        
        if resend and self.resend_api_key:
            resend.api_key = self.resend_api_key
        elif not resend:
            logger.warning("Resend package not installed. Install with: pip install resend")
    
    def send_messages(self, email_messages):
        """Send email messages using Resend API."""
        if not resend or not self.resend_api_key:
            if not self.fail_silently:
                raise ValueError("Resend not configured. Set RESEND_API_KEY in settings.")
            return 0
        
        sent_count = 0
        for message in email_messages:
            try:
                # Extract recipients
                to_emails = message.to
                if not to_emails:
                    logger.warning("No recipients in email message")
                    continue
                
                # Prepare email data
                email_data = {
                    "from": message.from_email or self.from_email,
                    "to": to_emails,  # Resend accepts list of recipients
                    "subject": message.subject,
                }
                
                # Handle CC and BCC
                if hasattr(message, 'cc') and message.cc:
                    email_data["cc"] = message.cc
                if hasattr(message, 'bcc') and message.bcc:
                    email_data["bcc"] = message.bcc
                
                # Extract HTML and text from alternatives
                html_content = None
                text_content = None
                
                if hasattr(message, 'alternatives') and message.alternatives:
                    for alt in message.alternatives:
                        if alt[1] == 'text/html':
                            html_content = alt[0]
                        elif alt[1] == 'text/plain':
                            text_content = alt[0]
                
                # Set HTML content (preferred) or text content
                if html_content:
                    email_data["html"] = html_content
                if text_content:
                    email_data["text"] = text_content
                
                # If no HTML/text from alternatives, use body
                if not html_content and not text_content:
                    # Try to determine if body is HTML or plain text
                    if '<html' in message.body.lower() or '<body' in message.body.lower():
                        email_data["html"] = message.body
                    else:
                        email_data["text"] = message.body
                
                # Send via Resend API
                result = resend.Emails.send(email_data)
                
                if result:
                    sent_count += 1
                    logger.info(f"Email sent successfully via Resend. Message ID: {result.get('id', 'unknown')}")
                else:
                    logger.warning(f"Resend API returned no result for email to {to_emails}")
                    
            except Exception as e:
                logger.error(f"Failed to send email via Resend: {e}", exc_info=True)
                if not self.fail_silently:
                    raise
        
        return sent_count

