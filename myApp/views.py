from django.shortcuts import render
from rest_framework import viewsets
from .models import Card, Temperature, Humidity, Current, Voltage
from django.core.mail import EmailMessage
from django.conf import settings
import mimetypes
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt


from .serializers import (
    CardSerializer, TemperatureSerializer, HumiditySerializer,
    CurrentSerializer, VoltageSerializer
)

class CardViewSet(viewsets.ModelViewSet):
    queryset = Card.objects.all()
    serializer_class = CardSerializer

class TemperatureViewSet(viewsets.ModelViewSet):
    queryset = Temperature.objects.all()
    serializer_class = TemperatureSerializer

class HumidityViewSet(viewsets.ModelViewSet):
    queryset = Humidity.objects.all()
    serializer_class = HumiditySerializer

class CurrentViewSet(viewsets.ModelViewSet):
    queryset = Current.objects.all()
    serializer_class = CurrentSerializer

class VoltageViewSet(viewsets.ModelViewSet):
    queryset = Voltage.objects.all()
    serializer_class = VoltageSerializer

def email_form_page(request):
    return render(request, 'emailing.html')

@csrf_exempt
def send_image_email(request):
    if request.method == 'POST':
        image = request.FILES.get('file')

        if not image:
            return JsonResponse({'error': 'Please select an image.'}, status=400)

        mime_type, _ = mimetypes.guess_type(image.name)
        if not mime_type or not mime_type.startswith('image/'):
            return JsonResponse({'error': 'Invalid image type.'}, status=400)

        if image.size > 20 * 1024 * 1024:
            return JsonResponse({'error': 'Image too large (max 20MB).'}, status=400)

        try:
            email = EmailMessage(
                subject='Photo Attachment from Webpage',
                body='This is an automated email with a photo attachment.',
                from_email=settings.DEFAULT_FROM_EMAIL,
                to=['shreshtha0311@gmail.com'],
            )
            email.attach(image.name, image.read(), mime_type)
            email.send()

            return JsonResponse({'message': 'Email sent successfully!'}, status=200)
        except Exception as e:
            return JsonResponse({'error': f'Error sending email: {e}'}, status=500)

    return JsonResponse({'error': 'Invalid request method.'}, status=405)