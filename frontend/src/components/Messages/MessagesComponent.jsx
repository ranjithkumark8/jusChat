import React from 'react'
import { Message } from './Message'
import styles from "./MessageComponent.module.css"
import ScrollableFeed from 'react-scrollable-feed'

export const MessagesComponent = ({ messages }) => {
    return (
        <ScrollableFeed className={styles.messageContainer}>
            {messages.map((message, i) => <Message message={message} key={i} />)}
        </ScrollableFeed>
    )
}
