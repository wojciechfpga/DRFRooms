import axios from 'axios';
import { API_ROUTES } from '../config/apiRoutes';
import { ERROR_MESSAGES } from '../config/errorMessages';
import { ALERT_MESSAGES } from '../config/alertMessages';

export const apiPostRegister = async (userData) => {
  const response = await axios.post(API_ROUTES.REGISTER, userData);
  return response.data;
}

export const apiPostLogin = async (credentials) => {
  const response = await axios.post(API_ROUTES.LOGIN, credentials);
  return response.data;
}

export const apiGetRetriveMyReservations = async (token) => {
  try {
    const response = await axios.get(API_ROUTES.MY_RESERVATIONS, {
      headers: { Authorization: `${token}` },
    });
    return response.data;
  } catch (error) {
    throw new Error(ERROR_MESSAGES.NETWORK_ERROR + error);
  }
};

export const apiPostSendReservation = async (formData, token) => {
  try {
    await axios.post(API_ROUTES.RESERVATIONS, formData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });
    alert(ALERT_MESSAGES.RESERVATION_CREATED);
  } catch {
    alert(ALERT_MESSAGES.RESERVATION_CREATION_ERROR);
  }
};

export const apiGetRetrieveRooms = async () => {
  try {
    const { data } = await axios.get(API_ROUTES.ROOMS);
    return data;
  } catch (error) {
    throw new Error(ERROR_MESSAGES.FETCH_ROOMS_ERROR + error);
  }
};

export const apiPatchUpdateReservation = async (token, event) => {
  try {
    const response = await axios.patch(
      `${API_ROUTES.RESERVATIONS}/${event.id}`,
      event,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const apiAdminDeleteRoom = async (token, id) => {
  try {
    await axios.delete(`/adminapi/rooms/${id}/`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
      }
    );

  } catch (error) {
    throw new Error(error.message);
  }
};

export const  apiAdminPutUpdateRoom = async (token, room,) => {
  try {
    const response = await axios.put(`/adminapi/rooms/${room.id}/`, room,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const apiAdminPostSendRoom = async (room, token) => {
  try {
    await axios.post('/adminapi/rooms/', room, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });
  } catch {

  }
};