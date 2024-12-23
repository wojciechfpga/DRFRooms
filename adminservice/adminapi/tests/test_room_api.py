from rest_framework.test import APITestCase
from rest_framework import status
from ..models import Rooms

class RoomAPITestCase(APITestCase):
    @classmethod
    def setUpTestData(cls):
        # Tworzenie przykładowych danych
        cls.room1 = Rooms.objects.create(name="Conference Room", capacity=20, is_active=True)
        cls.room2 = Rooms.objects.create(name="Meeting Room", capacity=10, is_active=False)
        cls.valid_room_data = {"name": "Training Room", "capacity": 30, "is_active": True}
        cls.invalid_room_data = {"name": "", "capacity": -5, "is_active": True}

    def test_get_rooms(self):
        response = self.client.get("/rooms/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)
        self.assertEqual(response.data[0]["name"], "Conference Room")

    def test_post_room(self):
        response = self.client.post("/rooms/", data=self.valid_room_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["name"], "Training Room")

    def test_post_room_invalid(self):
        response = self.client.post("/rooms/", data=self.invalid_room_data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("name", response.data)  # Sprawdzenie walidacji dla pola "name"

    def test_get_room_detail(self):
        response = self.client.get(f"/rooms/{self.room1.id}/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["name"], "Conference Room")

    def test_get_room_detail_not_found(self):
        response = self.client.get("/rooms/999/")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_put_room(self):
        updated_data = {"name": "Updated Conference Room", "capacity": 25, "is_active": False}
        response = self.client.put(f"/rooms/{self.room1.id}/", data=updated_data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["name"], "Updated Conference Room")

    def test_put_room_invalid(self):
        invalid_data = {"name": "", "capacity": -5, "is_active": False}
        response = self.client.put(f"/rooms/{self.room1.id}/", data=invalid_data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_delete_room(self):
        response = self.client.delete(f"/rooms/{self.room2.id}/")
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Rooms.objects.filter(id=self.room2.id).exists())

    def test_delete_room_not_found(self):
        response = self.client.delete("/rooms/999/")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
