class AnalyticsService:
    @staticmethod
    def get_aggregated_metrics():
        return {
            "total_impressions": 81100,
            "total_likes": 1284,
            "total_comments": 239,
            "avg_engagement_rate": 6.2,
            "channels": {
                "linkedin": {"impressions": 47100, "share": 0.58},
                "instagram": {"impressions": 34000, "share": 0.42}
            }
        }
