import pprint
#from loguru import logger
import logging
# Use Django’s logging
logger = logging.getLogger(__name__)
#
import pytest
#
from rest_framework.test import APIClient, APIRequestFactory
from rest_framework.authtoken.models import Token
from django.urls import reverse
#
from ..models import Category
from ..models import Todo 

pytestmark = [pytest.mark.django_db]

@pytest.fixture(scope="session")
def setup_data(django_db_setup, django_db_blocker):
    with django_db_blocker.unblock():
        default_category = Category.objects.create(title="N/A")
        Todo.objects.create(title="Sample Todo", category=default_category)
    return default_category

@pytest.fixture
def api_client():
    return APIClient()

@pytest.mark.django_db
def test_healthcheck(api_client):
    url = reverse('apihealth')
    response = api_client.get(url)
    assert response.status_code == 200

@pytest.mark.django_db
def test_todo_basic(api_client):
    url = reverse('todo-list')
    response = api_client.post(url, {}, format='json')
    assert response.status_code == 400  # Assuming some required fields are missing

@pytest.mark.django_db
def test_todo_title_only(api_client, setup_data):
    url = reverse('todo-list')
    response = api_client.post(url, {
        "title": "Test 14",
        "description": "Description of Test 14",
        "should_be_completed_by_date": "2024-11-07T11:28:54.324Z"
    }, format='json')
    assert response.status_code == 201
    # Access the pre-existing data
    all_todos = Todo.objects.all()
    all_categories = Category.objects.all()
    default_category = Category.objects.get(title="N/A")
    print(default_category.title)


