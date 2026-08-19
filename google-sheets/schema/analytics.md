# Google Sheets Analytics Sync Schema

| Column | Field Name | Type | Description |
|---|---|---|---|
| A | Post_ID | String | References Posts Sheet Row ID |
| B | Platform | Enum | \`LINKEDIN\` \| \`INSTAGRAM\` |
| C | Impressions | Integer | Total views / reach |
| D | Likes | Integer | Total reactions |
| E | Comments | Integer | Total comments |
| F | Shares | Integer | Total reshares / reposts |
| G | CTR_Percent | Float | Click-through percentage |
| H | Last_Updated | ISO DateTime | Timestamp of Celery fetch |
