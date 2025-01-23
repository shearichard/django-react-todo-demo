# backend/urls.py
from django.http import HttpResponse
from django.contrib import admin
from django.urls import path, include


urlpatterns = [
    path('admin/', admin.site.urls),
    path('todo/', include('todo.urls')),
    path('accounts/', include('allauth.urls')),
    path('accounts/profile/', lambda request: HttpResponse("Profile page placeholder - Temporary page until other infrastructure completed")),
]
#
