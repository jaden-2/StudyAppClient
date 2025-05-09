'use client';

import Message from "@components/msg/message";
import style from "./group.module.css"

export default function Group(props) {
    const messages = [
        { sender: "Alice", content: "Hey everyone, how's it going?" },
        { sender: "Bob", content: "I'm doing great! Just finished my math homework." },
        { sender: "Charlie", content: "Anyone up for a study session later?" },
        { sender: "Diana", content: "Sure, I need help with history." },
        { sender: "Eve", content: "I can help with history, Diana!" },
        { sender: "Frank", content: "Does anyone have notes for the last science lecture?" },
        { sender: "Grace", content: "I do! I'll share them in the group chat." },
        { sender: "Hank", content: "Thanks, Grace! You're a lifesaver." },
        { sender: "Ivy", content: "Can we also discuss the upcoming project deadline?" },
        { sender: "Jack", content: "Yes, let's plan a meeting for that." }
    ];
    if(props == null){
        return(
            <div><h1>Welcome to StudyApp</h1></div>
        )
    }
    return (
        <div>
            <div className={style.title}>Group title</div>
            <div className={style.messageContainer}>
                <ul className={style.messages}>
                    {messages.map((message, index) => (
                        <li key={index}>
                            <Message props={message}/>
                        </li>
                    ))}
                </ul>
            </div>

            <form action="" method="post" className={style.form}>
                <textarea name="message" id="" cols={5} rows={3}></textarea>
                <button type="submit">Send</button>
            </form>
        </div>
    );
}