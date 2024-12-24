from rest_framework import serializers
from .models import Rooms, Users, Reservations

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rooms
        fields = ['id', 'name', 'capacity', 'is_active']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ['username', 'role']

class ReservationSerializer(serializers.ModelSerializer):
    room = RoomSerializer()
    user = UserSerializer()

    class Meta:
        model = Reservations
        fields = '__all__'


