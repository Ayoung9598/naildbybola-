from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BookingRequestViewSet

router = DefaultRouter()
router.register(r'booking', BookingRequestViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
