from .models import Post

class PostService:
    @staticmethod
    def create_post(validated_data):
        return Post.objects.create(**validated_data)

    @staticmethod
    def schedule_post(post_id, scheduled_time):
        post = Post.objects.get(id=post_id)
        post.scheduled_time = scheduled_time
        post.status = 'scheduled'
        post.save()
        return post
