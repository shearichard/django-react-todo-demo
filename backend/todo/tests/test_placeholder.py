import pytest
from django.test import TestCase

def test_placeholder_0():
    assert 1 == 1

@pytest.mark.skip(reason="Not a real test")
def test_placeholder_1():
    assert 1 == 0
