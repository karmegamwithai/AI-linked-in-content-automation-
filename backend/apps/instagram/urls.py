from django.urls import path
from rest_framework.response import Response
from rest_framework.decorators import api_view

@api_view(['GET'])
def instagram_status(request):
    return Response({'status': 'connected', 'service': 'Instagram Graph API v19.0'})

urlpatterns = [
    path('status/', instagram_status, name='instagram-status'),
]
