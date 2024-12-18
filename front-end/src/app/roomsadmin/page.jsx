'use client'

import React from 'react';
import RoomListAdmin from '../../components/Room/RoomListAdmin';
import { useRoomList } from '../../hooks/room/useRoomList';

const RoomsPageAdmin = () => {
  const { rooms, addRoom, updateRoom, deleteRoom } = useRoomList();

  return (
    <div className="min-h-screen bg-gray-200 flex justify-center items-center">
      <RoomListAdmin rooms={rooms} onAddRoom={addRoom} onUpdateRoom={updateRoom} onDeleteRoom={deleteRoom} />
    </div>
  );
};

export default RoomsPageAdmin;
