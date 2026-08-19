def format_instagram_caption(caption, hashtags=[]):
    """Formats caption with tags appended."""
    if not hashtags:
        return caption
    tags_string = ' '.join([f"#{t.replace('#', '')}" for t in hashtags])
    return f"{caption}\n\n.\n.\n{tags_string}"
