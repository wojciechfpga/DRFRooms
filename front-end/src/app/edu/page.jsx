'use client'

import React, { useState } from 'react';

const MyComponent = () => {
    const [count, setCount] = useState(0);

    const increment = () => {
        setCount(prevCount => prevCount + 1);
    };

    console.log('Komponent renderuje się!');

    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={increment}>Increment</button>
        </div>
    );
};

export default MyComponent
