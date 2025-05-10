'use client';

import Message from "@components/msg/message";
import style from "./group.module.css"
import Image from "next/image";
import { useRef } from "react";


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

    const goHome = ()=>{
        props.goHome()
    }
    return (
        <div className={style.group}>
            <div className={style.title}>
                <button className={style.buttons} id="returnHome" onClick={goHome}>
                    <Image src={"/image/arrow_back.svg"}
                    width={25}
                    height={25}
                    alt="back arrow"></Image>
                </button>
                <span>Group title</span>
                <button className={style.buttons}>
                    <Image src={"/image/more.svg"}
                    width={25}
                    height={25}
                    alt="more"></Image>
                </button>
            </div>
           
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
                <textarea name="message"></textarea>
                <button type="submit" className={style.buttons}>
                    <Image src={"/image/send.svg"} width={50} height={50} alt="Send Icon" className={style.Image}></Image>
                </button>
            </form>
           
        </div>
    );
}