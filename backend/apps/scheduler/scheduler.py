from django_celery_beat.models import PeriodicTask, IntervalSchedule
import json

class SchedulerManager:
    @staticmethod
    def setup_default_intervals():
        schedule, _ = IntervalSchedule.objects.get_or_create(
            every=1,
            period=IntervalSchedule.MINUTES,
        )
        
        PeriodicTask.objects.get_or_create(
            interval=schedule,
            name='Dispatch Due Social Posts',
            task='apps.scheduler.tasks.check_and_publish_due_posts',
        )
