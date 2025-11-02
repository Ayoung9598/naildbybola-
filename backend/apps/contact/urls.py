from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ContactMessageViewSet, NewsletterSubscriberViewSet

router = DefaultRouter()
router.register(r'contact', ContactMessageViewSet)
router.register(r'newsletter', NewsletterSubscriberViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
