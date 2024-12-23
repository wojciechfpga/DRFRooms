'use client'

import { useState, useEffect } from "react";

const ReservationsPage = () => {
  const [reservations, setReservations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchReservations = async (page) => {
    try {
      const response = await fetch(`/adminapi/reservations/?page=${page}`);
      const data = await response.json();

      setReservations(data.results);
      setTotalPages(Math.ceil(data.count / 10)); // 10 is the page size
      setCurrentPage(page);
    } catch (error) {
      console.error("Error fetching reservations:", error);
    }
  };

  useEffect(() => {
    fetchReservations(1); // Initial page load
  }, []);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      fetchReservations(page);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Reservations</h1>
      <div className="space-y-4">
        {reservations.map((reservation) => (
          <div
            key={reservation.id}
            className="p-4 border border-gray-300 rounded shadow-sm"
          >
            <h2 className="text-lg font-semibold">{reservation.room.name}</h2>
            <p>
              Reserved by: <span className="font-medium">{reservation.user.username}</span>
            </p>
            <p>
              From: {new Date(reservation.start_time).toLocaleString()} To:{" "}
              {new Date(reservation.end_time).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-6 flex items-center justify-between">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Previous
        </button>
        <p>
          Page {currentPage} of {totalPages}
        </p>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ReservationsPage;
