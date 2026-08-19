import re

def clean_hashtags(tag_list):
    """Normalize tags by stripping hashes and extra spacing."""
    return [re.sub(r'[^a-zA-Z0-9_]', '', tag) for tag in tag_list if tag]

def truncate_caption(text, max_length=2200):
    if len(text) <= max_length:
        return text
    return text[:max_length - 3] + "..."
