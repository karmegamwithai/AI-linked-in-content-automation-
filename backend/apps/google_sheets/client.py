import os
from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build

class GoogleSheetsClient:
    SCOPES = ['https://www.googleapis.com/auth/spreadsheets']

    @classmethod
    def get_service(cls):
        creds_path = os.getenv('GOOGLE_SERVICE_ACCOUNT_FILE', 'credentials.json')
        creds = Credentials.from_service_account_file(creds_path, scopes=cls.SCOPES)
        return build('sheets', 'v4', credentials=creds)
