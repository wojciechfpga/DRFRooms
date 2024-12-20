'use client';

import React from 'react';
import RoomListAdmin from '../../components/Room/RoomListAdmin';
import { useRoomList } from '../../hooks/room/useRoomList';

const RoomsPageAdmin = () => {
  const { rooms, isLoading, addRoom, updateRoom, deleteRoom } = useRoomList();

  return (
    <div className="min-h-screen bg-gray-200 flex justify-center items-center">
      {isLoading ? (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full border-t-4 border-b-4 border-blue-500 w-[8vh] h-[8vh]"></div>
        </div>
      ) : (
        <RoomListAdmin
          rooms={rooms}
          onAddRoom={addRoom}
          onUpdateRoom={updateRoom}
          onDeleteRoom={deleteRoom}
        />
      )}
    </div>
  );
};

export default RoomsPageAdmin;
