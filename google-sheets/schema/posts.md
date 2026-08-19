# Google Sheets Posts Schema

| Column | Field Name | Type | Description |
|---|---|---|---|
| A | ID | String / Int | Unique row identifier |
| B | Title | String | Topic descriptor |
| C | Platforms | String | Semicolon-separated: \`LINKEDIN;INSTAGRAM\` |
| D | Content_LinkedIn | Text | LinkedIn body with hooks and line breaks |
| E | Content_Instagram | Text | Instagram caption with hashtags |
| F | Media_URL | URL | CDN or public image URL |
| G | Scheduled_Time | ISO DateTime | e.g. \`2026-08-20T09:00:00Z\` |
| H | Status | Enum | \`DRAFT\` \| \`SCHEDULED\` \| \`PUBLISHED\` \| \`FAILED\` |
| I | Impressions | Integer | Updated automatically by Celery sync |
