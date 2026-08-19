import requests
import os

class InstagramService:
    GRAPH_URL = "https://graph.facebook.com/v19.0"

    @classmethod
    def publish_post(cls, post):
        account_id = os.getenv("INSTAGRAM_BUSINESS_ACCOUNT_ID")
        access_token = os.getenv("INSTAGRAM_ACCESS_TOKEN")
        
        # Step 1: Create Media Container
        container_url = f"{cls.GRAPH_URL}/{account_id}/media"
        container_payload = {
            "caption": post.content_instagram,
            "access_token": access_token,
        }
        
        if post.media_urls:
            container_payload["image_url"] = post.media_urls[0]
            
        container_res = requests.post(container_url, data=container_payload).json()
        creation_id = container_res.get("id")
        
        if not creation_id:
            return {"error": "Failed to create media container", "details": container_res}
            
        # Step 2: Publish Container
        publish_url = f"{cls.GRAPH_URL}/{account_id}/media_publish"
        publish_payload = {
            "creation_id": creation_id,
            "access_token": access_token
        }
        
        publish_res = requests.post(publish_url, data=publish_payload).json()
        return publish_res
