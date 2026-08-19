from django.urls import path
from rest_framework.response import Response
from rest_framework.decorators import api_view

@api_view(['GET'])
def linkedin_status(request):
    return Response({'status': 'connected', 'service': 'LinkedIn UGC API v2'})

urlpatterns = [
    path('status/', linkedin_status, name='linkedin-status'),
]
