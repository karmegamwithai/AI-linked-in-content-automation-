# Google Sheets Integration Walkthrough

## Setup Instructions

1. **Google Cloud Console**:
   - Enable the **Google Sheets API** and **Google Drive API**.
   - Create a Service Account and download the JSON key as \`credentials.json\`.
   - Place \`credentials.json\` in the backend root.

2. **Spreadsheet Permissions**:
   - Share your target Google Sheet with the service account email (Editor permissions).

3. **Environment Configuration**:
   - Set \`GOOGLE_SHEET_ID\` in your backend \`.env\`.
   - Ensure the sheet tab name matches your settings (Default: \`Content_Pipeline_2026\`).

4. **Celery Worker Ingestion**:
   - Celery Beat automatically runs \`sync_google_sheets_pipeline_task\` at the configured interval.
