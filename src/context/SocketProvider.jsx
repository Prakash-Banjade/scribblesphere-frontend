// SocketProvider.js

import React, { useEffect, useContext, useState } from 'react';
import io from 'socket.io-client';
import { useSelector } from 'react-redux';
import { selectCurrentToken } from '../features/auth/authSlice';

export const SocketContext = React.createContext();

export const useSocket = () => useContext(SocketContext);

export function SocketProvider({ children }) {
    const token = useSelector(selectCurrentToken);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        if (token) {
            const newSocket = io(
                'http://localhost:3500',
                {
                    auth: { token },
                    autoConnect: false,
                }
            );

            newSocket.connect();
            setSocket(newSocket);

            newSocket.on('connect_error', error => {
                console.log(error)
            })

            return () => newSocket.close();
        }
    }, [token]);

    return (
        <SocketContext.Provider value={{ socket, setSocket }}>
            {children}
        </SocketContext.Provider>
    )
}
