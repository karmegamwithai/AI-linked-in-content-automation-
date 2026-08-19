from .client import GoogleSheetsClient
import os

class GoogleSheetsSyncService:
    def __init__(self, spreadsheet_id=None):
        self.spreadsheet_id = spreadsheet_id or os.getenv('GOOGLE_SHEET_ID')

    def sync_calendar_sheet(self):
        """Reads rows from sheet and generates / schedules post items."""
        service = GoogleSheetsClient.get_service()
        sheet = service.spreadsheets()
        result = sheet.values().get(
            spreadsheetId=self.spreadsheet_id,
            range="Content_Pipeline_2026!A2:H"
        ).execute()
        return result.get('values', [])
