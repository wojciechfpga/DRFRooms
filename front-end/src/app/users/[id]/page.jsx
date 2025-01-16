'use client';

import React from 'react';
import UserDetails from '../../../components/UsersSectionComponents/UserDetails';

const UserPage = ({ params }) => {
    const { id } = params; // Dynamiczny parametr z URL (np. /users/1)

    return (
        <div>
            <h1>User Management</h1>
            <UserDetails userId={id} />
        </div>
    );
};

export default UserPage;
