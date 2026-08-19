# ContentFlow REST API Documentation

## Endpoints

### 1. Posts API
- \`GET /api/posts/\` - List all social posts
- \`POST /api/posts/\` - Create new post
- \`GET /api/posts/{id}/\` - Retrieve single post
- \`PUT /api/posts/{id}/\` - Update post details
- \`DELETE /api/posts/{id}/\` - Delete post
- \`POST /api/posts/{id}/publish_now/\` - Dispatches immediately to LinkedIn and Instagram
- \`GET /api/posts/scheduled/\` - List all queued scheduled posts

### 2. AI Generation API (Gemini 3.7 Flash)
- \`POST /api/generate-post\`
  - Payload: \`{ topic, tone, targetAudience, platforms, mediaType }\`
  - Response: Formatted LinkedIn post, Instagram caption, hashtags, and viral hooks.
- \`POST /api/analyze-post\`
  - Payload: \`{ content, platform }\`
  - Response: Readability score, hook strength, optimization suggestions.

### 3. Google Sheets Synchronization
- \`POST /api/sheets/sync/\` - Triggers bi-directional Celery synchronization.
