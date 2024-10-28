# todo/views.py
from django.shortcuts import render  # noqa : F401
from rest_framework import viewsets
from .serializers import TodoSerializer
from .models import Todo


class TodoView(viewsets.ModelViewSet):
    serializer_class = TodoSerializer
    queryset = Todo.objects.all()
