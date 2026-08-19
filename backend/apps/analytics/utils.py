def calculate_engagement_rate(impressions, interactions):
    if impressions == 0:
        return 0.0
    return round((interactions / impressions) * 100, 2)
