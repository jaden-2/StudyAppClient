'use client';

import Message from "app/components/message";

export default function Group({group}) {
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
    if(group == null){
        return(
            <div><h1>Welcome to Study App</h1></div>
        )
    }
    return (
        <div>
            <h1>Group Messages</h1>
            <ul>
                {messages.map((message, index) => (
                    <li key={index}>
                        <Message props={message}/>
                    </li>
                ))}
            </ul>
        </div>
    );
}