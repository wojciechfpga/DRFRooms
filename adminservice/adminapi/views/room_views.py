from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ..services import RoomService
from ..serializers import RoomSerializer

class RoomListCreateView(APIView):
    def get(self, request):
        rooms = RoomService.list_rooms()
        serializer = RoomSerializer(rooms, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = RoomSerializer(data=request.data)
        if serializer.is_valid():
            try:
                room = RoomService.create_room(serializer.validated_data)
                return Response(RoomSerializer(room).data, status=status.HTTP_201_CREATED)
            except ValueError as e:
                return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RoomDetailView(APIView):
    def get(self, request, pk):
        room = RoomService.get_room_details(pk)
        if room is None:
            return Response({"error": "Room not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = RoomSerializer(room)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, pk):
        serializer = RoomSerializer(data=request.data)
        if serializer.is_valid():
            try:
                room = RoomService.update_room(pk, serializer.validated_data)
                if room is None:
                    return Response({"error": "Room not found"}, status=status.HTTP_404_NOT_FOUND)
                return Response(RoomSerializer(room).data, status=status.HTTP_200_OK)
            except ValueError as e:
                return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        room = RoomService.delete_room(pk)
        if room is None:
            return Response({"error": "Room not found"}, status=status.HTTP_404_NOT_FOUND)
        return Response(status=status.HTTP_204_NO_CONTENT)
