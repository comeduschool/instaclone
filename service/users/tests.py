from django.test import TestCase
from rest_framework.test import APITestCase

from views import UserViewSet
# Create your tests here.

class UserTestCase(TestCase):
    def test_signup(self):
        pass

    def test_signin(self):
        pass

class UserAPITestCase(APITestCase):
    pass
