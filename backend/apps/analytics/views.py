from rest_framework.views import APIView
from rest_framework.response import Response
from .services import AnalyticsService

class OverviewAnalyticsView(APIView):
    def get(self, request):
        data = AnalyticsService.get_aggregated_metrics()
        return Response(data)
