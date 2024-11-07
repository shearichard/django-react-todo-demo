import pytest
#
from rest_framework.test import APIClient
from rest_framework.authtoken.models import Token
from django.urls import reverse

pytestmark = [pytest.mark.django_db]


def test_placeholder_0():
    assert 1 == 1

@pytest.fixture
def api_client():
    return APIClient()

@pytest.mark.django_db
def test_healthcheck(api_client):
    url = reverse('apihealth')
    print(url)
    response = api_client.get(url)
    assert response.status_code == 200

@pytest.mark.django_db
def test_healthcheck_failure(api_client):
    url = reverse('apihealthmockedfailure')
    print(url)
    response = api_client.get(url)
    '''
    logger.info("X" * 50)
    logger.info(response.json())
    logger.info("X" * 50)
    print(type(response.json()))
    logger.info("X" * 50)
    '''
    assert response.status_code == 400
    # Parse JSON response content
    response_data = response.json()
    #            
    # Assert the 'type' attribute exists and has the value 'validation_error'
    assert 'type' in response_data, "Response does not contain 'type' attribute"
    assert response_data['type'] == 'validation_error', "The 'type' attribute is not 'validation_error' as expected"

