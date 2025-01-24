# backend/urls.py
from django.http import HttpResponse
from django.contrib import admin
from django.urls import path, include

from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView, SpectacularRedocView


urlpatterns = [
    path('admin/', admin.site.urls),
    path('todo/', include('todo.urls')),
    path('accounts/', include('allauth.urls')),
    path('accounts/profile/', lambda request: HttpResponse("Profile page placeholder - Temporary page until other infrastructure completed")),
    path("_allauth/", include("allauth.headless.urls")),
]
'''
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),  # OpenAPI schema
    path('api/docs/swagger/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),  # Swagger UI
    path('api/docs/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),  # Redoc UI
'''
