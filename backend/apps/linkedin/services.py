import requests
import os
import json

class LinkedInService:
    BASE_URL = "https://api.linkedin.com/v2"

    @classmethod
    def get_headers(cls, access_token=None):
        token = access_token or os.getenv("LINKEDIN_ACCESS_TOKEN")
        return {
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json",
            "X-Restli-Protocol-Version": "2.0.0"
        }

    @classmethod
    def publish_post(cls, post):
        headers = cls.get_headers()
        author_urn = os.getenv("LINKEDIN_PERSON_URN")
        
        payload = {
            "author": f"urn:li:person:{author_urn}",
            "lifecycleState": "PUBLISHED",
            "specificContent": {
                "com.linkedin.ugc.ShareContent": {
                    "shareCommentary": {
                        "text": post.content_linkedin
                    },
                    "shareMediaCategory": "NONE" if not post.media_urls else "IMAGE",
                }
            },
            "visibility": {
                "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"
            }
        }
        
        url = f"{cls.BASE_URL}/ugcPosts"
        response = requests.post(url, headers=headers, data=json.dumps(payload))
        return response.json() if response.status_code == 201 else {"error": response.text}
