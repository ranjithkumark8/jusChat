import React from 'react'
import socketIOClient from "socket.io-client"

export const SocketContext = React.createContext()

export const SocketContextProvider = ({ children }) => {
    const ENDPOINT = "http://localhost:2244"
    const socket = socketIOClient(ENDPOINT)



    let value = { socket }
    return (
        <SocketContext.Provider value={value}>
            {children}
        </SocketContext.Provider>
    )
}
