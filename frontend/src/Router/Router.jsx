import React from 'react'
import { Route, Switch } from "react-router-dom"
import { Chat } from '../components/Chat'
import { ChatHome } from '../components/ChatHome'
// import { NavBar } from '../components/NavBar'
export const Router = () => {
    return (
        <>
            {/* <NavBar /> */}
            <Switch>
                <Route path="/" exact>
                    <ChatHome />
                </Route>
                <Route path="/chat">
                    <Chat />
                </Route>
            </Switch>
        </>
    )
}
