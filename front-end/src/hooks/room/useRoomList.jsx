'use client'

import { useState, useEffect } from 'react';
import axios from 'axios';
import * as fn from './../../services/apiService'
export const useRoomList = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    axios.get('/adminapi/rooms').then((response) => setRooms(response.data));
  }, []);

  const addRoom = async (room) => {
    const response = await fn.apiAdminPostSendRoom(room,'none')
    setRooms([...rooms, response.data]);
  };

  const updateRoom = async (room) => {
    await fn.apiAdminPutUpdateRoom("none", room)
    setRooms(rooms.map((r) => (r.id === room.id ? room : r)));
  };

  const deleteRoom = async (id) => {
    await fn.apiAdminDeleteRoom("none",id)
    setRooms(rooms.filter((room) => room.id !== id));
  };

  return { rooms, addRoom, updateRoom, deleteRoom };
};
