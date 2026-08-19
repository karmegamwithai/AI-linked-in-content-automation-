import requests

class InstagramAPI:
    GRAPH_URL = "https://graph.facebook.com/v19.0"

    @classmethod
    def get_account_insights(cls, account_id, token):
        url = f"{cls.GRAPH_URL}/{account_id}/insights"
        params = {
            "metric": "impressions,reach,profile_views",
            "period": "day",
            "access_token": token
        }
        return requests.get(url, params=params).json()
