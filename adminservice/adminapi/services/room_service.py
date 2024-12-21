from ..repositories.room_repository import RoomRepository

class RoomService:
    @staticmethod
    def list_rooms():
        return RoomRepository.get_all_rooms()

    @staticmethod
    def get_room_details(pk):
        return RoomRepository.get_room_by_id(pk)

    @staticmethod
    def create_room(data):
        if RoomRepository.get_room_by_name(data['name']):
            raise ValueError("Room name is already taken.")
        return RoomRepository.create_room(data)

    @staticmethod
    def update_room(pk, data):
        room = RoomRepository.get_room_by_id(pk)
        if room is None:
            return None

        if RoomRepository.get_room_by_name(data['name'], exclude_id=pk):
            raise ValueError("Room name is already taken.")

        return RoomRepository.update_room(room, data)

    @staticmethod
    def delete_room(pk):
        room = RoomRepository.get_room_by_id(pk)
        if room:
            RoomRepository.delete_room(room)
        return room
    @staticmethod
    def list_rooms():
        return RoomRepository.get_all_rooms()

    @staticmethod
    def get_room_details(pk):
        return RoomRepository.get_room_by_id(pk)

    @staticmethod
    def create_room(data):
        if RoomRepository.get_room_by_name(data['name']):
            raise ValueError("Room name is already taken.")
        return RoomRepository.create_room(data)

    @staticmethod
    def update_room(pk, data):
        room = RoomRepository.get_room_by_id(pk)
        if room is None:
            return None

        if RoomRepository.get_room_by_name(data['name'], exclude_id=pk):
            raise ValueError("Room name is already taken.")

        return RoomRepository.update_room(room, data)

    @staticmethod
    def delete_room(pk):
        room = RoomRepository.get_room_by_id(pk)
        if room:
            RoomRepository.delete_room(room)
        return room
