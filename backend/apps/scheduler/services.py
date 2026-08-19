from django.utils import timezone
from apps.posts.models import Post

class SchedulerService:
    @staticmethod
    def get_upcoming_queue():
        return Post.objects.filter(
            status='scheduled',
            scheduled_time__gt=timezone.now()
        ).order_by('scheduled_time')
