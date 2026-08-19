from django.urls import path
from rest_framework.response import Response
from rest_framework.decorators import api_view

@api_view(['POST'])
def trigger_sync(request):
    return Response({'status': 'queued', 'message': 'Google Sheets background sync triggered.'})

urlpatterns = [
    path('sync/', trigger_sync, name='sheets-trigger-sync'),
]
