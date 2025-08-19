from django.shortcuts import render

def home(request):
    return render(request,'Inkscapeing.html')

def equipment(request):
    return render(request,'ChangeEquipment.html')

def dasboard(request):
    return render(request,'dynamicDb.html')

# @csrf_exempt  # ✅ TEMPORARY — REMOVE once CSRF is handled on frontend
# def send_image_email(request):
#     if request.method == 'POST':
#         image = request.FILES.get('file')  # "file" should match your form input name

#         # Validate image
#         if not image:
#             return JsonResponse({'error': 'Please select an image.'}, status=400)

#         mime_type, _ = mimetypes.guess_type(image.name)
#         if not mime_type or not mime_type.startswith('image/'):
#             return JsonResponse({'error': 'Invalid image type.'}, status=400)

#         if image.size > 20 * 1024 * 1024:
#             return JsonResponse({'error': 'Image too large (max 20MB).'}, status=400)

#         # Try sending email
#         try:
#             email = EmailMessage(
#                 subject='Photo Attachment from Webpage',
#                 body='This is an automated email with a photo attachment.',
#                 from_email=settings.DEFAULT_FROM_EMAIL,
#                 to=['shreshtha0311@gmail.com'],
#             )
#             email.attach(image.name, image.read(), mime_type)
#             email.send()

#             return JsonResponse({'message': 'Email sent successfully!'}, status=200)

#         except Exception as e:
#             return JsonResponse({'error': f'Error sending email: {e}'}, status=500)

#     # If not POST method
#     return JsonResponse({'error': 'Invalid request method.'}, status=405)