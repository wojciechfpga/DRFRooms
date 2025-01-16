import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserDetails = ({ userId }) => {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Pobierz szczegóły użytkownika
        axios.get(`/adminapi/users/${userId}/`)
            .then(response => {
                setUser(response.data);
                setRole(response.data.role || '');
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching user details:", error);
                setLoading(false);
            });
    }, [userId]);

    const updateRole = () => {
        axios.patch(`/adminapi/users/${userId}/role/`, { role })
            .then(() => {
                alert("Role updated successfully!");
            })
            .catch(error => {
                console.error("Error updating role:", error);
                alert("Failed to update role.");
            });
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <h2>User Details</h2>
            {user ? (
                <div>
                    <p><strong>Username:</strong> {user.username}</p>
                    <p><strong>Current Role:</strong> {user.role || 'Not assigned'}</p>
                    <label>
                        <strong>Update Role:</strong>
                        <input
                            type="text"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        />
                    </label>
                    <button onClick={updateRole}>Update Role</button>
                </div>
            ) : (
                <p>User not found.</p>
            )}
        </div>
    );
};

export default UserDetails;
