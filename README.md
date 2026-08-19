# ContentFlow — Social Media Automation Platform

A social media automation platform for **LinkedIn** and **Instagram**, backed by **Django**, **Celery**, **Google Sheets**, and **Gemini 3.7 Flash AI**.

## Core Features

- 🖤 **Minimalist Black & White UI**: Designed with **Urbanist** typography, clean rounded edges, and high-contrast ergonomics.
- ⚡ **Dual-Channel Generator**: Real-time drafting for LinkedIn & Instagram simultaneously with platform-specific formatting and live mockup previews.
- 🤖 **Gemini 3.7 Flash AI Engine**: Hooks crafter, tone selector, hashtag generation, and content scoring audit.
- 📊 **Google Sheets Bi-Directional Pipeline**: Use Google Sheets as an editorial calendar with automatic sync to Celery queues and analytics write-back.
- ⏱️ **Automated Scheduling Queue**: Timed publishing dispatcher powered by Celery worker and Celery Beat.
- 📈 **Performance & Analytics Hub**: Real-time cross-platform metrics, reach growth trajectories, channel breakdown, and peak publishing windows.
- 📁 **Django Backend Explorer**: Interactive in-app codebase viewer for all Django apps, tasks, serializers, and documentation.

## Running Locally

```bash
# Frontend & Express Gemini Proxy
npm run dev

# Or with Docker Compose
docker-compose up --build
```
