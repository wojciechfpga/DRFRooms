import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import * as fn from './../../services/apiService';

export const useRoomList = () => {
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const [newItem, setNewItem] = useState(false);
  useEffect(() => {
    const fetchRooms = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('/adminapi/rooms');
        setRooms(response.data);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRooms();
  }, [newItem]);

  const addRoom = async (room) => {
    setIsLoading(true);
    try {
      const response = await fn.apiAdminPostSendRoom(room, token);
      setRooms([...rooms, response.data]);
    } finally {
      setIsLoading(false);
      setNewItem(!newItem)
    }
  };

  const updateRoom = async (room) => {
    setIsLoading(true);
    try {
      await fn.apiAdminPutUpdateRoom(token, room);
      setRooms(rooms.map((r) => (r.id === room.id ? room : r)));
    } finally {
      setIsLoading(false);
    }
  };

  const deleteRoom = async (id) => {
    setIsLoading(true);
    try {
      await fn.apiAdminDeleteRoom(token, id);
      setRooms(rooms.filter((room) => room.id !== id));
    } finally {
      setIsLoading(false);
    }
  };

  return { rooms, isLoading, addRoom, updateRoom, deleteRoom };
};
