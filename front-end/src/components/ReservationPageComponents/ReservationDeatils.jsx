'use client';

import { useState, useEffect } from 'react';

export default function ReservationDetails({ reservationId }) {
  const [reservation, setReservation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchReservationDetails() {
      try {
        setLoading(true);
        const response = await fetch(`/adminapi/reservations/${reservationId}`);
        if (!response.ok) {
          throw new Error(`Error fetching reservation: ${response.statusText}`);
        }
        const data = await response.json();
        setReservation(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (reservationId) {
      fetchReservationDetails();
    }
  }, [reservationId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!reservation) return <div>No reservation found.</div>;

  const { room, user, start_time, end_time } = reservation;

  return (
    <div className="p-4 border rounded-lg bg-gray-100">
      <h2 className="text-xl font-bold mb-4">Reservation Details</h2>
      <div>
        <strong>Reservation ID:</strong> {reservation.id}
      </div>
      <div>
        <strong>Room:</strong> {room.name} (Capacity: {room.capacity})
      </div>
      <div>
        <strong>User:</strong> {user.username} (Role: {user.role || 'N/A'})
      </div>
      <div>
        <strong>Start Time:</strong> {new Date(start_time).toLocaleString()}
      </div>
      <div>
        <strong>End Time:</strong> {new Date(end_time).toLocaleString()}
      </div>
    </div>
  );
}
