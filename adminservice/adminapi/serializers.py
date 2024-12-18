from rest_framework import serializers
from .models import Rooms

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rooms
        fields = ['id', 'name', 'capacity', 'is_active']

    def validate_name(self, value):
        room_id = self.instance.id if self.instance else None


        if Rooms.objects.filter(name=value).exclude(id=room_id).exists():
            raise serializers.ValidationError("Room name is already taken.")
        return value
