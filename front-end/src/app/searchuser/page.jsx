'use client'

import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import debounce from "lodash.debounce";

const UserSearch = () => {
  const [query, setQuery] = useState(""); // Wyszukiwana fraza
  const [users, setUsers] = useState([]); // Wyniki wyszukiwania
  const [page, setPage] = useState(1); // Numer aktualnej strony
  const [hasNextPage, setHasNextPage] = useState(false); // Czy są kolejne strony
  const [loading, setLoading] = useState(false); // Czy trwa ładowanie

  const fetchUsers = useCallback(
    debounce(async (searchQuery, pageNumber) => {
      setLoading(true);
      try {
        const response = await axios.get("/adminapi/users/", {
          params: { search: searchQuery, page: pageNumber },
        });
        setUsers(pageNumber === 1 ? response.data.results : [...users, ...response.data.results]);
        setHasNextPage(Boolean(response.data.next)); // Sprawdź, czy jest następna strona
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    }, 300),
    [] // Debouncing z opóźnieniem 300 ms
  );

  useEffect(() => {
    fetchUsers(query, page);
  }, [query, page]);

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
    setPage(1); // Resetuj stronę po zmianie wyszukiwanego hasła
  };

  const loadMoreUsers = () => {
    if (hasNextPage && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Search users..."
        value={query}
        onChange={handleSearchChange}
        className="border p-2 w-full mb-4"
      />
      <ul className="list-disc pl-5">
        {users.map((user) => (
          <li key={user.username}>
            {user.username} - {user.role}
          </li>
        ))}
      </ul>
      {loading && <p>Loading...</p>}
      {hasNextPage && !loading && (
        <button onClick={loadMoreUsers} className="mt-4 px-4 py-2 bg-gray-800 text-white">
          Load More
        </button>
      )}
    </div>
  );
};

export default UserSearch;
