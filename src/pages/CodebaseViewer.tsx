import React, { useState } from 'react';
import { 
  FolderGit2, 
  FileCode, 
  Folder, 
  FolderOpen, 
  Copy, 
  Check, 
  Download, 
  ChevronRight, 
  ChevronDown,
  Terminal,
  FileText,
  FileSpreadsheet,
  Layers
} from 'lucide-react';

interface CodeFile {
  path: string;
  category: 'django' | 'sheets' | 'docs' | 'docker';
  language: string;
  description: string;
  content: string;
}

export const CODEBASE_FILES: CodeFile[] = [
  {
    path: 'backend/manage.py',
    category: 'django',
    language: 'python',
    description: 'Django command-line utility for administrative tasks.',
    content: `#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys

def main():
    """Run administrative tasks."""
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)

if __name__ == '__main__':
    main()
`
  },
  {
    path: 'backend/config/settings.py',
    category: 'django',
    language: 'python',
    description: 'Django main settings configuration with Celery, Redis, and REST Framework.',
    content: `import os
from pathlib import Path
from dotenv import load_dotenv

load_dotenv()

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = os.getenv('DJANGO_SECRET_KEY', 'django-insecure-automation-secret-key-2026')

DEBUG = os.getenv('DEBUG', 'True') == 'True'

ALLOWED_HOSTS = ['*']

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    
    # Third-party
    'rest_framework',
    'corsheaders',
    'django_celery_beat',
    
    # Custom automation apps
    'apps.posts',
    'apps.scheduler',
    'apps.linkedin',
    'apps.instagram',
    'apps.analytics',
    'apps.google_sheets',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'config.urls'

WSGI_APPLICATION = 'config.wsgi.application'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# Celery Configuration
CELERY_BROKER_URL = os.getenv('REDIS_URL', 'redis://localhost:6379/0')
CELERY_RESULT_BACKEND = os.getenv('REDIS_URL', 'redis://localhost:6379/0')
CELERY_ACCEPT_CONTENT = ['json']
CELERY_TASK_SERIALIZER = 'json'
CELERY_TIMEZONE = 'UTC'

# REST Framework
REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny',
    ],
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 20,
}

CORS_ALLOW_ALL_ORIGINS = True
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True
STATIC_URL = 'static/'
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
`
  },
  {
    path: 'backend/config/urls.py',
    category: 'django',
    language: 'python',
    description: 'Main routing URLconf connecting all social and scheduling APIs.',
    content: `from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/posts/', include('apps.posts.urls')),
    path('api/analytics/', include('apps.analytics.urls')),
    path('api/linkedin/', include('apps.linkedin.urls')),
    path('api/instagram/', include('apps.instagram.urls')),
    path('api/sheets/', include('apps.google_sheets.urls')),
]
`
  },
  {
    path: 'backend/apps/posts/views.py',
    category: 'django',
    language: 'python',
    description: 'Post CRUD, immediate publish actions, and scheduling triggers.',
    content: `from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .serializers import PostSerializer
from .models import Post
from apps.scheduler.tasks import publish_scheduled_post_task
from apps.linkedin.services import LinkedInService
from apps.instagram.services import InstagramService

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all().order_by('-created_at')
    serializer_class = PostSerializer

    @action(detail=True, methods=['post'])
    def publish_now(self, request, pk=None):
        post = self.get_object()
        results = {}
        
        if 'linkedin' in post.platforms:
            results['linkedin'] = LinkedInService.publish_post(post)
        if 'instagram' in post.platforms:
            results['instagram'] = InstagramService.publish_post(post)
            
        post.status = 'published'
        post.save()
        return Response({'status': 'published', 'results': results})

    @action(detail=False, methods=['get'])
    def scheduled(self, request):
        scheduled_posts = Post.objects.filter(status='scheduled').order_by('scheduled_time')
        serializer = self.get_serializer(scheduled_posts, many=True)
        return Response(serializer.data)
`
  },
  {
    path: 'backend/apps/scheduler/tasks.py',
    category: 'django',
    language: 'python',
    description: 'Celery background workers polling for due posts and Google Sheets sync.',
    content: `from celery import shared_task
from django.utils import timezone
from apps.posts.models import Post
from apps.linkedin.services import LinkedInService
from apps.instagram.services import InstagramService
from apps.google_sheets.sheets_service import GoogleSheetsSyncService

@shared_task
def check_and_publish_due_posts():
    """Runs every minute via Celery Beat to dispatch due posts."""
    now = timezone.now()
    due_posts = Post.objects.filter(status='scheduled', scheduled_time__lte=now)
    
    for post in due_posts:
        publish_scheduled_post_task.delay(post.id)

@shared_task
def publish_scheduled_post_task(post_id):
    try:
        post = Post.objects.get(id=post_id)
        if 'linkedin' in post.platforms:
            LinkedInService.publish_post(post)
        if 'instagram' in post.platforms:
            InstagramService.publish_post(post)
            
        post.status = 'published'
        post.published_at = timezone.now()
        post.save()
    except Post.DoesNotExist:
        pass

@shared_task
def sync_google_sheets_pipeline_task():
    """Runs periodically to ingest rows from the Google Sheet calendar."""
    service = GoogleSheetsSyncService()
    service.sync_calendar_sheet()
`
  },
  {
    path: 'backend/apps/linkedin/services.py',
    category: 'django',
    language: 'python',
    description: 'LinkedIn REST API v2 publishing service (UGC Post API & Media upload).',
    content: `import requests
import os
import json

class LinkedInService:
    BASE_URL = "https://api.linkedin.com/v2"

    @classmethod
    def get_headers(cls, access_token=None):
        token = access_token or os.getenv("LINKEDIN_ACCESS_TOKEN")
        return {
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json",
            "X-Restli-Protocol-Version": "2.0.0"
        }

    @classmethod
    def publish_post(cls, post):
        """Publishes text / image UGC post to LinkedIn API."""
        headers = cls.get_headers()
        author_urn = os.getenv("LINKEDIN_PERSON_URN")
        
        payload = {
            "author": f"urn:li:person:{author_urn}",
            "lifecycleState": "PUBLISHED",
            "specificContent": {
                "com.linkedin.ugc.ShareContent": {
                    "shareCommentary": {
                        "text": post.content_linkedin
                    },
                    "shareMediaCategory": "NONE" if not post.media_urls else "IMAGE",
                }
            },
            "visibility": {
                "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"
            }
        }
        
        url = f"{cls.BASE_URL}/ugcPosts"
        response = requests.post(url, headers=headers, data=json.dumps(payload))
        return response.json() if response.status_code == 201 else {"error": response.text}
`
  },
  {
    path: 'backend/apps/instagram/services.py',
    category: 'django',
    language: 'python',
    description: 'Instagram Graph API v19.0 container creation and publish service.',
    content: `import requests
import os

class InstagramService:
    GRAPH_URL = "https://graph.facebook.com/v19.0"

    @classmethod
    def publish_post(cls, post):
        """2-step Instagram Graph API container creation and media publish."""
        account_id = os.getenv("INSTAGRAM_BUSINESS_ACCOUNT_ID")
        access_token = os.getenv("INSTAGRAM_ACCESS_TOKEN")
        
        # Step 1: Create Media Container
        container_url = f"{cls.GRAPH_URL}/{account_id}/media"
        container_payload = {
            "caption": post.content_instagram,
            "access_token": access_token,
        }
        
        if post.media_urls:
            container_payload["image_url"] = post.media_urls[0]
            
        container_res = requests.post(container_url, data=container_payload).json()
        creation_id = container_res.get("id")
        
        if not creation_id:
            return {"error": "Failed to create media container", "details": container_res}
            
        # Step 2: Publish Container
        publish_url = f"{cls.GRAPH_URL}/{account_id}/media_publish"
        publish_payload = {
            "creation_id": creation_id,
            "access_token": access_token
        }
        
        publish_res = requests.post(publish_url, data=publish_payload).json()
        return publish_res
`
  },
  {
    path: 'backend/apps/google_sheets/sheets_service.py',
    category: 'django',
    language: 'python',
    description: 'Google Sheets API v4 connector to read scheduled posts and write analytics.',
    content: `from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build
import os

class GoogleSheetsSyncService:
    SCOPES = ['https://www.googleapis.com/auth/spreadsheets']

    def __init__(self, spreadsheet_id=None):
        self.spreadsheet_id = spreadsheet_id or os.getenv('GOOGLE_SHEET_ID')
        self.creds_file = os.getenv('GOOGLE_SERVICE_ACCOUNT_FILE', 'credentials.json')

    def get_service(self):
        creds = Credentials.from_service_account_file(self.creds_file, scopes=self.SCOPES)
        return build('sheets', 'v4', credentials=creds)

    def fetch_calendar_rows(self, sheet_range="Content_Pipeline_2026!A2:H"):
        service = self.get_service()
        sheet = service.spreadsheets()
        result = sheet.values().get(spreadsheetId=self.spreadsheet_id, range=sheet_range).execute()
        return result.get('values', [])

    def update_post_status(self, row_index, status_text):
        service = self.get_service()
        range_name = f"Content_Pipeline_2026!H{row_index}"
        body = {'values': [[status_text]]}
        service.spreadsheets().values().update(
            spreadsheetId=self.spreadsheet_id,
            range=range_name,
            valueInputOption='RAW',
            body=body
        ).execute()
`
  },
  {
    path: 'google-sheets/schema/posts.md',
    category: 'sheets',
    language: 'markdown',
    description: 'Google Sheets schema specification for social posts and dispatch queue.',
    content: `# Google Sheets Posts Schema

| Column | Name | Type | Description |
|---|---|---|---|
| A | ID | Integer | Unique identifier for row tracking |
| B | Title | String | Topic descriptor |
| C | Platforms | String | 'LINKEDIN', 'INSTAGRAM', or 'BOTH' |
| D | Content_LinkedIn | Text | LinkedIn formatted body with hooks and line breaks |
| E | Content_Instagram | Text | Instagram caption with hashtags |
| F | Media_URL | URL | Public image or video URL |
| G | Scheduled_Time | DateTime | ISO 8601 UTC string (e.g. 2026-08-20T09:00:00Z) |
| H | Status | Enum | 'DRAFT', 'SCHEDULED', 'PUBLISHED', 'FAILED' |
`
  },
  {
    path: 'docs/SOCIAL_MEDIA_SETUP.md',
    category: 'docs',
    language: 'markdown',
    description: 'Full walkthrough for generating LinkedIn & Instagram OAuth tokens.',
    content: `# Social Media API Credentials & Setup

## 1. LinkedIn Developer Portal
1. Create an application at https://www.linkedin.com/developers/
2. Request \`w_member_social\` (or \`w_organization_social\`) permissions.
3. Configure OAuth 2.0 redirect URI.
4. Retrieve your \`LINKEDIN_ACCESS_TOKEN\` and \`LINKEDIN_PERSON_URN\`.

## 2. Meta for Developers (Instagram Graph API)
1. Link your Instagram Business or Creator account to a Facebook Page.
2. In Meta App Dashboard, enable the **Instagram Graph API**.
3. Generate a Long-Lived User Access Token with \`instagram_basic\` and \`instagram_content_publish\`.
4. Obtain your \`INSTAGRAM_BUSINESS_ACCOUNT_ID\`.
`
  },
  {
    path: 'docker-compose.yml',
    category: 'docker',
    language: 'yaml',
    description: 'Docker compose file running Django API, Celery worker, Celery beat, Redis, and React Vite UI.',
    content: `version: '3.8'

services:
  frontend:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    depends_on:
      - backend

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "8000:8000"
    env_file:
      - ./backend/.env
    depends_on:
      - redis

  celery_worker:
    build:
      context: ./backend
      dockerfile: Dockerfile
    command: celery -A config worker --loglevel=info
    env_file:
      - ./backend/.env
    depends_on:
      - redis
      - backend

  celery_beat:
    build:
      context: ./backend
      dockerfile: Dockerfile
    command: celery -A config beat --loglevel=info
    env_file:
      - ./backend/.env
    depends_on:
      - redis
      - backend

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
`
  }
];

export const CodebaseViewer: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<CodeFile>(CODEBASE_FILES[0]);
  const [copied, setCopied] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const filteredFiles = CODEBASE_FILES.filter(
    (f) => filterCategory === 'all' || f.category === filterCategory
  );

  return (
    <div id="page-codebase-viewer" className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-zinc-50 border border-black/5">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-black tracking-tight flex items-center gap-2.5">
            <span>Django Backend & Docs Codebase</span>
          </h1>
          <p className="text-xs text-black/40 font-bold uppercase tracking-wider mt-0.5">
            Browse, inspect, and copy complete Django apps, Celery workers, and Sheets services
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-black text-white hover:opacity-90 text-xs font-bold transition-all shadow-xs active:scale-95"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied Code' : 'Copy File Content'}</span>
          </button>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-1 bg-white p-1 rounded-full border border-black/5 w-fit text-xs font-semibold">
        <button
          onClick={() => setFilterCategory('all')}
          className={`px-3.5 py-1.5 rounded-full transition-all ${
            filterCategory === 'all' ? 'bg-black text-white font-bold' : 'text-black/50 hover:text-black'
          }`}
        >
          All Files ({CODEBASE_FILES.length})
        </button>
        <button
          onClick={() => setFilterCategory('django')}
          className={`px-3.5 py-1.5 rounded-full transition-all ${
            filterCategory === 'django' ? 'bg-black text-white font-bold' : 'text-black/50 hover:text-black'
          }`}
        >
          Django Backend
        </button>
        <button
          onClick={() => setFilterCategory('sheets')}
          className={`px-3.5 py-1.5 rounded-full transition-all ${
            filterCategory === 'sheets' ? 'bg-black text-white font-bold' : 'text-black/50 hover:text-black'
          }`}
        >
          Google Sheets Schemas
        </button>
        <button
          onClick={() => setFilterCategory('docs')}
          className={`px-3.5 py-1.5 rounded-full transition-all ${
            filterCategory === 'docs' ? 'bg-black text-white font-bold' : 'text-black/50 hover:text-black'
          }`}
        >
          API & Setup Docs
        </button>
      </div>

      {/* 2-Column Code Explorer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: File Tree List (4 cols) */}
        <div className="lg:col-span-4 p-5 rounded-3xl bg-zinc-50 border border-black/5 space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-black/40 block mb-2 px-2">
            Project Files
          </span>

          <div className="space-y-1">
            {filteredFiles.map((file) => {
              const isSelected = selectedFile.path === file.path;
              return (
                <button
                  key={file.path}
                  onClick={() => setSelectedFile(file)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-2xl text-xs font-mono transition-all flex items-center justify-between group ${
                    isSelected
                      ? 'bg-black text-white shadow-xs'
                      : 'text-black/60 hover:text-black hover:bg-white'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <FileCode className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-white' : 'text-black/40'}`} />
                    <span className="truncate">{file.path}</span>
                  </div>
                  <span className={`text-[9px] uppercase px-2 py-0.5 rounded-full font-bold ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-black/5 text-black/60'
                  }`}>
                    {file.language}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Code Viewer (8 cols) */}
        <div className="lg:col-span-8 rounded-3xl bg-zinc-50 border border-black/5 overflow-hidden">
          {/* File Top Meta */}
          <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-black/5">
            <div>
              <p className="font-mono text-xs font-bold text-black flex items-center gap-2">
                <span>{selectedFile.path}</span>
              </p>
              <p className="text-[11px] text-black/50 mt-0.5">{selectedFile.description}</p>
            </div>
            <span className="text-[10px] font-mono uppercase bg-black text-white px-2.5 py-1 rounded-full font-bold">
              {selectedFile.language}
            </span>
          </div>

          {/* Code Body */}
          <div className="p-6 bg-zinc-950 font-mono text-xs overflow-x-auto max-h-[560px]">
            <pre className="text-zinc-200 leading-relaxed">
              <code>{selectedFile.content}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
