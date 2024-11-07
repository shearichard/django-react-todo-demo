from datetime import datetime 
from datetime import timedelta 
#
import pytest
#
from ..models import Category, Todo

@pytest.fixture(scope="session")
def setup_test_data(django_db_setup, django_db_blocker):
    with django_db_blocker.unblock():
        default_category = Category.objects.create(title="N/A")
        Todo.objects.create(title="Sample Todo", category=default_category)
    return default_category


@pytest.fixture(scope="session")
def tomorrow_datetime_utc():
    future_time = datetime.utcnow() + timedelta(hours=24)
    # Format the datetime in the desired format with millisecond precision and UTC (Z)
    formatted_time = future_time.strftime('%Y-%m-%dT%H:%M:%S.%f')[:-3] + 'Z'
    #
    return formatted_time


@pytest.fixture(scope="session")
def yesterday_datetime_utc():
    future_time = datetime.utcnow() - timedelta(hours=24)
    # Format the datetime in the desired format with millisecond precision and UTC (Z)
    formatted_time = future_time.strftime('%Y-%m-%dT%H:%M:%S.%f')[:-3] + 'Z'
    #
    return formatted_time
