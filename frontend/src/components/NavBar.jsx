import React from 'react'
import { Link } from 'react-router-dom'

export const NavBar = () => {
    return (
        <div>
            <Link to="/">Chat Home</Link>
            <Link to="/chat">Chat</Link>
        </div>
    )
}
