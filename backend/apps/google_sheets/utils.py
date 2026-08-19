def parse_sheet_row_to_post(row):
    """Maps a 8-column Google Sheet row to a dictionary."""
    return {
        "title": row[1] if len(row) > 1 else "",
        "platforms": [p.lower().strip() for p in (row[2].split(";") if len(row) > 2 else ["linkedin"])],
        "content_linkedin": row[3] if len(row) > 3 else "",
        "content_instagram": row[4] if len(row) > 4 else "",
        "media_urls": [row[5]] if len(row) > 5 and row[5] else [],
        "scheduled_time": row[6] if len(row) > 6 else None,
        "status": row[7].lower() if len(row) > 7 else "draft"
    }
