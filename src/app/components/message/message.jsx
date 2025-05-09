'use client'
import styles from "./message.module.css"


export default function Message(msg){
    return(
    <div className={styles.message}>
        <p className={styles.sender}><strong>{sender}</strong></p>
        <p className={styles.content}>{content}</p>
    </div>
    )
    
}