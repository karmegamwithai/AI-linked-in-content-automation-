import requests
import os

class LinkedInAPI:
    BASE_URL = "https://api.linkedin.com/v2"

    @classmethod
    def get_profile(cls, token):
        headers = {"Authorization": f"Bearer {token}"}
        return requests.get(f"{cls.BASE_URL}/me", headers=headers).json()
