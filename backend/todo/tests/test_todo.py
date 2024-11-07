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
def test_todo_title_only(api_client, setup_test_data, tomorrow_datetime_utc):


    # Calculate 24 hours after the current time
    #
    url = reverse('todo-list')
    #
    response = api_client.post(url, {
        "title": "Test test_todo_title_only",
        "description": "Description of Test test_todo_title_only",
        "should_be_completed_by_date": tomorrow_datetime_utc
    }, format='json')
    assert response.status_code == 201
    # Access the pre-existing data
    all_todos = Todo.objects.all()
    all_categories = Category.objects.all()
    default_category = Category.objects.get(title="N/A")
    print(default_category.title)


