# backend/urls.py
from django.urls import path, include
from rest_framework import routers
from . import views
from . import api 

router = routers.DefaultRouter()
router.register(r'todos', views.TodoView, 'todo')

VERSION_NUMBER = 1

urlapi_patterns = [
    path(
        "", 
        views.index, 
        name="todo_test_index"),
    path(
        f"api/v{VERSION_NUMBER}/", 
        include(router.urls)),
    path(
        f"api/v{VERSION_NUMBER}/healthcheck/",  
        api.APIHealthView.as_view(), 
        name="apihealth"),
    path(
        f"api/v{VERSION_NUMBER}/healthcheckmockedfailure/",
        api.APIHealthViewMockedFailure.as_view(),
        name="apihealthmockedfailure",
    ),
]
urlpatterns = urlapi_patterns
