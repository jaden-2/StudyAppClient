'use client'
import styles from "./message.module.css"


export default function Message(msg){
    msg = msg.props
    return(
    <div className={styles.message}>
        <p className={styles.sender}><strong>{msg.sender}</strong></p>
        <p className={styles.content}>{msg.content}</p>
    </div>
    )
    
}