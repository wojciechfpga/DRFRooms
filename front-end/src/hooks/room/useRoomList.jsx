'use client'

import { useState, useEffect } from 'react';
import axios from 'axios';

export const useRoomList = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    axios.get('/adminapi/rooms').then((response) => setRooms(response.data));
  }, []);

  const addRoom = async (room) => {
    const response = await axios.post('http://localhost:8000/adminapi/rooms', room);
    setRooms([...rooms, response.data]);
  };

  const updateRoom = async (room) => {
    await axios.put(`/api/rooms/${room.id}`, room);
    setRooms(rooms.map((r) => (r.id === room.id ? room : r)));
  };

  const deleteRoom = async (id) => {
    await axios.delete(`/api/rooms/${id}`);
    setRooms(rooms.filter((room) => room.id !== id));
  };

  return { rooms, addRoom, updateRoom, deleteRoom };
};
