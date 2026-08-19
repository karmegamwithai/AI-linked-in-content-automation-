from celery import shared_task
from django.utils import timezone
from apps.posts.models import Post
from apps.linkedin.services import LinkedInService
from apps.instagram.services import InstagramService
from apps.google_sheets.sheets_service import GoogleSheetsSyncService

@shared_task
def check_and_publish_due_posts():
    """Runs every minute via Celery Beat to dispatch due posts."""
    now = timezone.now()
    due_posts = Post.objects.filter(status='scheduled', scheduled_time__lte=now)
    
    for post in due_posts:
        publish_scheduled_post_task.delay(post.id)

@shared_task
def publish_scheduled_post_task(post_id):
    try:
        post = Post.objects.get(id=post_id)
        if 'linkedin' in post.platforms:
            LinkedInService.publish_post(post)
        if 'instagram' in post.platforms:
            InstagramService.publish_post(post)
            
        post.status = 'published'
        post.published_at = timezone.now()
        post.save()
    except Post.DoesNotExist:
        pass

@shared_task
def sync_google_sheets_pipeline_task():
    """Runs periodically to ingest rows from the Google Sheet calendar."""
    service = GoogleSheetsSyncService()
    service.sync_calendar_sheet()
