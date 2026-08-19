from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Post
from .serializers import PostSerializer
from apps.linkedin.services import LinkedInService
from apps.instagram.services import InstagramService

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all().order_by('-created_at')
    serializer_class = PostSerializer

    @action(detail=True, methods=['post'])
    def publish_now(self, request, pk=None):
        post = self.get_object()
        results = {}
        
        if 'linkedin' in post.platforms:
            results['linkedin'] = LinkedInService.publish_post(post)
        if 'instagram' in post.platforms:
            results['instagram'] = InstagramService.publish_post(post)
            
        post.status = 'published'
        post.save()
        return Response({'status': 'published', 'results': results})

    @action(detail=False, methods=['get'])
    def scheduled(self, request):
        scheduled = Post.objects.filter(status='scheduled').order_by('scheduled_time')
        serializer = self.get_serializer(scheduled, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def published(self, request):
        published = Post.objects.filter(status='published').order_by('-published_at')
        serializer = self.get_serializer(published, many=True)
        return Response(serializer.data)
