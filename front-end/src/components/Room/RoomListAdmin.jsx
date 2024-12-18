'use client'

import React, { useState } from 'react';
import RoomItem from './RoomItemAdmin';

const RoomList = ({ rooms, onAddRoom, onUpdateRoom, onDeleteRoom }) => {
  const [newRoom, setNewRoom] = useState({ name: '', capacity: '' });

  const handleAddRoom = () => {
    if (newRoom.name && newRoom.capacity) {
      onAddRoom(newRoom);
      setNewRoom({ name: '', capacity: '' });
    }
  };

  return (
    <div className="bg-gray-100 p-6 rounded-md shadow-md">
      <h1 className="text-xl font-bold text-black mb-4">Available Rooms</h1>
      <ul className="space-y-4">
        {rooms.map((room) => (
          <RoomItem
            key={room.id}
            room={room}
            onUpdateRoom={onUpdateRoom}
            onDeleteRoom={onDeleteRoom}
          />
        ))}
      </ul>
      <div className="mt-6">
        <h2 className="text-black font-medium mb-2">Add New Room</h2>
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Room Name"
            className="border border-gray-300 rounded p-2 w-full"
            value={newRoom.name}
            onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })}
          />
          <input
            type="number"
            placeholder="Capacity"
            className="border border-gray-300 rounded p-2 w-full"
            value={newRoom.capacity}
            onChange={(e) =>
              setNewRoom({ ...newRoom, capacity: parseInt(e.target.value, 10) })
            }
          />
          <button
            onClick={handleAddRoom}
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomList;
