from rest_framework import serializers
from .models import Rooms

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rooms
        fields = ['id', 'name', 'capacity', 'is_active']

