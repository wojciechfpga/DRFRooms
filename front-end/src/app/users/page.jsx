'use client';

import { useState, useEffect, useRef } from 'react';
import Link from "next/link";
export default function UsersPage() {
  const [users, setUsers] = useState([]); // Lista użytkowników
  const [page, setPage] = useState(1); // Numer aktualnej strony
  const [hasMore, setHasMore] = useState(true); // Czy są więcej użytkowników do załadowania
  const [loading, setLoading] = useState(false); // Czy dane się ładują
  const observer = useRef(); // Referencja dla IntersectionObserver

  const fetchUsers = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const res = await fetch(`/adminapi/users/?page=${page}`);
      const data = await res.json();
      setUsers((prev) => [...prev, ...data.results]);
      setHasMore(!!data.next); // Jeśli jest link `next`, to mamy więcej stron
      setPage((prev) => prev + 1);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  // Ustawiamy IntersectionObserver dla infinite scroll
  const lastUserElementRef = useRef(null);
  useEffect(() => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchUsers();
        }
      },
      { threshold: 1 }
    );

    if (lastUserElementRef.current) {
      observer.current.observe(lastUserElementRef.current);
    }
  }, [loading, hasMore]);

  useEffect(() => {
    // Początkowe załadowanie użytkowników
    fetchUsers();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <Link href="/searchuser"><h2>Search user</h2></Link>
      <div className="space-y-4">
        {users.map((user, index) => (
          <div
            key={user.username}
            ref={index === users.length - 1 ? lastUserElementRef : null} // Obserwujemy ostatni element
            className="p-4 border border-gray-300 rounded shadow-sm"
          >
            <p className="font-semibold">{user.username}</p>
            <p className="text-gray-600">Role: {user.role || 'N/A'}</p>
          </div>
        ))}
        {loading && <p>Loading...</p>}
        {!hasMore && !loading && <p>No more users to display.</p>}
      </div>
    </div>
  );
}
