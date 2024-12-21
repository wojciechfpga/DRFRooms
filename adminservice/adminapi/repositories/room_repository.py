from ..models import Rooms

class RoomRepository:
    @staticmethod
    def get_all_rooms():
        return Rooms.objects.all()

    @staticmethod
    def get_room_by_id(pk):
        try:
            return Rooms.objects.get(pk=pk)
        except Rooms.DoesNotExist:
            return None

    @staticmethod
    def get_room_by_name(name, exclude_id=None):
        query = Rooms.objects.filter(name=name)
        if exclude_id:
            query = query.exclude(id=exclude_id)
        return query.first()

    @staticmethod
    def create_room(data):
        return Rooms.objects.create(**data)

    @staticmethod
    def update_room(room, data):
        for key, value in data.items():
            setattr(room, key, value)
        room.save()
        return room

    @staticmethod
    def delete_room(room):
        room.delete()

