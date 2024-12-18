'use client'

import React, { useState } from 'react';

const RoomItemAdmin = ({ room, onUpdateRoom, onDeleteRoom }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedRoom, setUpdatedRoom] = useState(room);

  const handleSave = () => {
    onUpdateRoom(updatedRoom);
    setIsEditing(false);
  };

  return (
    <li className="flex justify-between items-center bg-white p-4 rounded-md shadow-md">
      {!isEditing ? (
        <div>
          <h2 className="text-lg font-semibold text-black">{room.name}</h2>
          <p className="text-gray-600">Capacity: {room.capacity}</p>
        </div>
      ) : (
        <div className="flex space-x-2">
          <input
            type="text"
            value={updatedRoom.name}
            onChange={(e) => setUpdatedRoom({ ...updatedRoom, name: e.target.value })}
            className="border border-gray-300 rounded p-2"
          />
          <input
            type="number"
            value={updatedRoom.capacity}
            onChange={(e) =>
              setUpdatedRoom({ ...updatedRoom, capacity: parseInt(e.target.value, 10) })
            }
            className="border border-gray-300 rounded p-2"
          />
        </div>
      )}
      <div className="flex space-x-2">
        {!isEditing ? (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="bg-gray-300 text-black px-3 py-1 rounded hover:bg-gray-400"
            >
              Update
            </button>
            <button
              onClick={() => onDeleteRoom(room.id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleSave}
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-300 text-black px-3 py-1 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </li>
  );
};

export default RoomItemAdmin;
