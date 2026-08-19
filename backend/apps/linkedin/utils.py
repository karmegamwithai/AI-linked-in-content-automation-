def format_linkedin_text(text):
    """Normalize line endings for LinkedIn API."""
    return text.replace('\r\n', '\n').strip()
