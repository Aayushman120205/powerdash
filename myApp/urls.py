from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import (
    CardViewSet, TemperatureViewSet, HumidityViewSet,
    CurrentViewSet, VoltageViewSet,email_form_page,send_image_email,
)

router = DefaultRouter()
router.register(r'cards', CardViewSet)
router.register(r'temperatures', TemperatureViewSet)
router.register(r'humidities', HumidityViewSet)
router.register(r'currents', CurrentViewSet)
router.register(r'voltages', VoltageViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('email/', email_form_page, name='email_form_page'),
    path('send-email/', send_image_email, name='send_email'),
]