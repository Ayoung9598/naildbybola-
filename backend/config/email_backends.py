"""
Custom email backend using Resend API (works with Render free tier - no SMTP needed).
"""
import logging
from django.core.mail.backends.base import BaseEmailBackend
from django.conf import settings

logger = logging.getLogger(__name__)

# Try to import resend package
resend = None
resend_import_error = None
try:
    import resend
    # Verify it has the Emails attribute we need
    if hasattr(resend, 'Emails'):
        logger.info("✅ Resend package imported successfully")
    else:
        logger.error("❌ Resend package imported but missing 'Emails' attribute")
        resend = None
except ImportError as e:
    resend_import_error = str(e)
    logger.error(f"❌ Failed to import resend package: {e}")
    logger.error("   Make sure 'resend' is in requirements.txt and installed")
    logger.error("   Try: pip install resend==1.0.0")
except Exception as e:
    resend_import_error = str(e)
    logger.error(f"❌ Unexpected error importing resend package: {e}")


class ResendEmailBackend(BaseEmailBackend):
    """Email backend using Resend API instead of SMTP."""
    
    def __init__(self, fail_silently=False, **kwargs):
        super().__init__(fail_silently=fail_silently, **kwargs)
        
        # Check if resend package is installed
        if not resend:
            error_msg = "❌ Resend package not installed. Install with: pip install resend"
            if resend_import_error:
                error_msg += f"\n   Import error: {resend_import_error}"
            logger.error(error_msg)
            self.resend_api_key = None
            self.from_email = getattr(settings, 'DEFAULT_FROM_EMAIL', 'noreply@naildbybola.com')
            return
        
        # Get API key from settings (always set, even if empty)
        self.resend_api_key = getattr(settings, 'RESEND_API_KEY', None)
        self.from_email = getattr(settings, 'DEFAULT_FROM_EMAIL', 'noreply@naildbybola.com')
        
        # Check if API key is set and not empty
        if not self.resend_api_key or not self.resend_api_key.strip():
            logger.warning("⚠️  RESEND_API_KEY not set or empty in settings. Emails will not be sent.")
            logger.warning(f"   Current value: {repr(self.resend_api_key)}")
            logger.warning(f"   Set RESEND_API_KEY in Render Dashboard → Environment variables")
            return
        
        # Set Resend API key
        try:
            resend.api_key = self.resend_api_key.strip()
            logger.info(f"✅ Resend API key configured (length: {len(self.resend_api_key)})")
        except Exception as e:
            logger.error(f"❌ Failed to set Resend API key: {e}")
            self.resend_api_key = None
    
    def send_messages(self, email_messages):
        """Send email messages using Resend API."""
        # Try to import resend again at runtime (in case it wasn't available at module load)
        global resend
        if not resend:
            try:
                import resend
                logger.info("✅ Resend package imported successfully at runtime")
                # Set API key if we just imported it
                if self.resend_api_key:
                    try:
                        resend.api_key = self.resend_api_key.strip()
                        logger.info(f"✅ Resend API key configured at runtime (length: {len(self.resend_api_key)})")
                    except Exception as e:
                        logger.error(f"❌ Failed to set Resend API key at runtime: {e}")
            except ImportError as e:
                logger.error(f"❌ Failed to import resend package at runtime: {e}")
                logger.error("   This usually means the package isn't installed in the Docker container")
                logger.error("   Check that 'resend==1.0.0' is in requirements.txt")
                if not self.fail_silently:
                    raise ValueError(f"Resend package not installed. Error: {e}. Install with: pip install resend==1.0.0")
                return 0
        
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
                
                # Resend v1.0.0 accepts both string and list for 'to'
                # Convert to list if it's a single string
                if isinstance(to_emails, str):
                    to_emails_list = [to_emails]
                else:
                    to_emails_list = list(to_emails)
                
                # Prepare email data
                email_data = {
                    "from": message.from_email or self.from_email,
                    "to": to_emails_list,  # Resend accepts list of recipients
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
                # Resend v1.0.0 uses resend.Emails.send() with params dict
                logger.info(f"📧 Sending email via Resend")
                logger.info(f"   From: {email_data.get('from')}")
                logger.info(f"   To: {to_emails_list}")
                logger.info(f"   Subject: {email_data.get('subject')}")
                logger.debug(f"Email data: subject={email_data.get('subject')}, has_html={bool(email_data.get('html'))}, has_text={bool(email_data.get('text'))}")
                
                # Ensure API key is set (in case it wasn't set during init)
                if not hasattr(resend, 'api_key') or not resend.api_key:
                    resend.api_key = self.resend_api_key.strip()
                    logger.info("✅ Resend API key set before sending")
                
                # Call Resend API - use the correct format from documentation
                logger.info(f"   Calling Resend API...")
                try:
                    result = resend.Emails.send(email_data)
                except Exception as api_error:
                    # Catch Resend API exceptions and log them clearly
                    logger.error(f"   ❌ Resend API call failed: {api_error}")
                    logger.error(f"   Error type: {type(api_error).__name__}")
                    # Try to extract more details from the exception
                    if hasattr(api_error, 'message'):
                        logger.error(f"   Error message: {api_error.message}")
                    if hasattr(api_error, 'status_code'):
                        logger.error(f"   Status code: {api_error.status_code}")
                    if hasattr(api_error, 'response'):
                        logger.error(f"   Response: {api_error.response}")
                    # Log the full exception string
                    logger.error(f"   Full error: {str(api_error)}")
                    raise  # Re-raise to be caught by outer exception handler
                
                # Log the full result for debugging (use info so it shows in Render logs)
                logger.info(f"   Resend API response received")
                logger.info(f"   Response type: {type(result).__name__}")
                if hasattr(result, '__dict__'):
                    logger.info(f"   Response attributes: {[attr for attr in dir(result) if not attr.startswith('_')]}")
                if isinstance(result, dict):
                    logger.info(f"   Response dict: {result}")
                elif hasattr(result, 'id'):
                    logger.info(f"   Response ID: {result.id}")
                
                # Check for errors in result
                if hasattr(result, 'error'):
                    error_msg = f"❌ Resend API error: {result.error}"
                    logger.error(error_msg)
                    if not self.fail_silently:
                        raise ValueError(error_msg)
                    continue
                
                # Check if result is a dict with error
                if isinstance(result, dict) and result.get('error'):
                    error_msg = f"❌ Resend API error: {result.get('error')}"
                    logger.error(error_msg)
                    if not self.fail_silently:
                        raise ValueError(error_msg)
                    continue
                
                # Check for success (message ID indicates success)
                if result and hasattr(result, 'id'):
                    sent_count += 1
                    logger.info(f"✅ Email sent successfully via Resend. Message ID: {result.id}")
                elif result and isinstance(result, dict) and result.get('id'):
                    sent_count += 1
                    logger.info(f"✅ Email sent successfully via Resend. Message ID: {result.get('id')}")
                elif result:
                    sent_count += 1
                    logger.info(f"✅ Email sent successfully via Resend. Result: {result}")
                else:
                    error_msg = f"❌ Resend API returned no result for email to {to_emails}"
                    logger.error(error_msg)
                    logger.error(f"   Full result object: {result}")
                    if not self.fail_silently:
                        raise ValueError(error_msg)
                    
            except Exception as e:
                error_msg = f"❌ Failed to send email via Resend to {to_emails}: {str(e)}"
                logger.error(error_msg, exc_info=True)
                logger.error(f"Email data was: {email_data}")
                logger.error(f"Exception type: {type(e).__name__}")
                
                # Check for specific Resend API errors
                error_str = str(e).lower()
                if 'unauthorized' in error_str or 'invalid api key' in error_str:
                    logger.error("   ⚠️  This looks like an API key issue. Check RESEND_API_KEY in environment variables.")
                elif 'domain' in error_str or 'from' in error_str or 'sender' in error_str:
                    logger.error("   ⚠️  This looks like a 'from' address issue.")
                    logger.error("   💡 Resend's test domain (onboarding@resend.dev) may have restrictions.")
                    logger.error("   💡 Try verifying your domain in Resend Dashboard or use a verified email.")
                elif 'recipient' in error_str or 'to' in error_str:
                    logger.error("   ⚠️  This looks like a recipient address issue.")
                    logger.error("   💡 Resend's test domain may only allow sending to verified addresses.")
                
                if not self.fail_silently:
                    raise Exception(error_msg) from e
        
        return sent_count

