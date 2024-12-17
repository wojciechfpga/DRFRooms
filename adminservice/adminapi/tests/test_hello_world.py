from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from django.urls import reverse

class HelloWorldAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_hello_world(self):

        response = self.client.get(reverse('helloword'))  
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # Sprawdź treść odpowiedzi
        self.assertEqual(response.data, {"message": "Hello, World!"})
