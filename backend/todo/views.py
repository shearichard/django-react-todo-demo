# todo/views.py
from django.shortcuts import render  # noqa : F401
from django.http import HttpResponse
from django.shortcuts import get_object_or_404, render
#
from rest_framework import viewsets
#
from .serializers import TodoSerializer
from .models import Todo


class TodoView(viewsets.ModelViewSet):
    serializer_class = TodoSerializer
    queryset = Todo.objects.all()


def index(request):
    bar = {"bar": "Placeholder value"}
    return render(request, "todo/index.html", {"foo": bar})


def todolist(request):
    bar = {"bar": "Todo List"}
    return render(request, "todo/indexinner.html", {"foo": bar})
