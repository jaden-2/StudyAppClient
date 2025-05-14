'use client'
import styles from "./message.module.css"
import Image from 'next/image'

export default function Message({ props: msg }) {
    const initial = msg.sender.charAt(0).toUpperCase()
    const messageTime = new Date(msg.createdAt).toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
    })

    return (
        <div className={styles.messageContainer}>
            <div className={styles.avatar}>
                {initial}
            </div>
            <div className={styles.messageContent}>
                <div className={styles.messageHeader}>
                    <span className={styles.sender}>{msg.sender}</span>
                    <span className={styles.timestamp}>{messageTime}</span>
                </div>
                <p className={styles.content}>{msg.content}</p>
            </div>
        </div>
    )
}