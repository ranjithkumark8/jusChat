import React from 'react'
import { useLocation } from 'react-router'
import styles from "./Message.module.css"
import ReactEmoji from "react-emoji";

export const Message = ({ message: { message, botName, time } }) => {
    // console.log(message)
    let isCurrentUser = false
    const location = useLocation()
    // const userName = location.state.userName
    const searchParams = new URLSearchParams(location.search);
    const userName = searchParams.get("name");
    // const group = searchParams.get("room");
    const name = userName.trim()
    // console.log(name, botName, time)
    if (name === botName) {
        isCurrentUser = true
    }
    let messageContainerStyles1 = `${styles.messageContainer} ${styles.justifyEnd}`
    let messageContainerStyles2 = `${styles.messageContainer} ${styles.justifyStart}`
    return (
        isCurrentUser ? (
            <div className={messageContainerStyles1} >
                <div className={styles.messageBoxGreen}>
                    <p>{ReactEmoji.emojify(message)}</p>
                    <div className={styles.messageSender}>
                        <p>{`${botName} ${time}`}</p>
                    </div>
                </div>
            </div>
        ) : (
            <div className={messageContainerStyles2} >
                <div className={styles.messageBoxWhite}>
                    <p>{ReactEmoji.emojify(message)}</p>
                    <div className={styles.messageSender}>
                        <p style={{ color: "GrayText" }}>{`${botName} ${time}`}</p>
                    </div>
                </div>
            </div>
        )
    )
}
