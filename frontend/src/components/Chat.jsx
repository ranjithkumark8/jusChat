import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { SocketContext } from '../context/SocketContextProvider'
import styles from "./Chat.module.css"
import { Users } from './Users/Users'
import { MessagesComponent } from "./Messages/MessagesComponent"

export const Chat = (props) => {
    const location = useLocation()
    const { socket } = React.useContext(SocketContext)
    const [message, setMessage] = React.useState("")
    const [groupUsers, setGroupUsers] = React.useState([])
    const [messages, setMessages] = React.useState([])

    const searchParams = new URLSearchParams(location.search);
    // const userName = searchParams.get("name");
    const group = searchParams.get("room");
    // const group = location.state.group

    useEffect(() => {
        socket.on("groupUsers", ({ group, users }) => {
            outputUsers(users)
        })

        socket.on("message", userMessage => {
            setMessages(messages => [...messages, userMessage])
        })

    }, [])


    const outputUsers = users => {
        setGroupUsers(users)
    }

    const handleMessageSend = (e) => {
        e.preventDefault()
        // Emitting Chat Message
        if (message) {
            socket.emit("chatMessage", message)
            setMessage("")
        }
    }

    return (
        <div className={styles.OuterContainer}>
            <div className={styles.InnerContainer}>
                <div className={styles.ChatHeaderContainer}>
                    <div className={styles.ChatHeader}>
                        <h3>Group Name:</h3>
                        <h3>{group}</h3>
                    </div>
                    <div className={styles.ChatActive}>
                        <h3>Active Users</h3>
                    </div>
                </div>
                <div className={styles.InnerContainer_chat}>
                    <MessagesComponent messages={messages} className={styles.InnerContainer_chat_message} />
                    <Users users={groupUsers} />
                </div>
                {/* <div>Leave</div> */}
                <div className={styles.ChatEditor}>
                    <input type="text" placeholder="Type Your Message here..." value={message} onChange={(e) => setMessage(e.target.value)} required />
                    <button type="submit" onClick={handleMessageSend}>Send</button>
                </div>
            </div>
        </div>
    )
}
