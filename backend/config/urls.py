from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/posts/', include('apps.posts.urls')),
    path('api/analytics/', include('apps.analytics.urls')),
    path('api/linkedin/', include('apps.linkedin.urls')),
    path('api/instagram/', include('apps.instagram.urls')),
    path('api/sheets/', include('apps.google_sheets.urls')),
]
