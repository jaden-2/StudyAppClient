'use client';
import Message from "@components/msg/message";
import style from "./group.module.css"
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Client } from "@stomp/stompjs";

export default function Group({groupData}) {
    const {group, goHome} = groupData
    let groupMessages;

    if(group){
    groupMessages = group.messages;
    }

    const [message, setMessage] = useState("")
    var clientRef = useRef(null);

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
    let sty = {
        display:"flex",
        justifyContent:"center",
        alignItems: "center",
        height: "60%",
        width: "90vw",
        marginLeft: "40px"
    }

    if(group == null){
        return(
            <div style={sty}><h1>Welcome to StudyApp</h1></div>
        )
    }

    useEffect(()=>{
        if(!group)
            return;
        const token = localStorage.getItem("jwtToken")

        if(!token)
            return;

        const client = new Client({
            brokerURL: "ws://localhost:9000/ws-studyApp",
            connectHeaders: {
                Authorization: `Bearer ${token}`
            },
            onConnect: (stage)=>{
                console.log(`Connected to ${stage}`)
                client.subscribe("/sock/studyApp/topic", (message)=>{
                    console.log(JSON.parse(message))
                })
            },

            onStompError: (frame)=>{
                console.error('Broker reported error: ', frame.headers['message']);
                console.error('Additional details: ', frame.body);
            }
        })

        client.activate();
        clientRef.current = client;
        
        return ()=>{
            client.deactivate()
        }
    }, [group])
    

    const sendMessage =  (event)=>{
        event.preventDefault()
        if(!clientRef.current || !clientRef.current.connected){
            console.error("Client not connected")
            return
        }

        let msgDto = {
        content: message,
        "group": group.title
        }

        clientRef.current.publish({
            destination: "/sock/studyApp/group/chat", 
            body: JSON.stringify(msgDto)
        })
        setMessage("")
        
        
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
                <span>{group.title}</span>
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

            <form action="" method="post" className={style.form} onSubmit={sendMessage}>
                <textarea name="message" value={message} onChange={(e)=>setMessage(e.target.value)} placeholder="Enter message"></textarea>
                <button type="submit" className={style.buttons} disabled={message==""}>
                    <Image src={"/image/send.svg"} width={50} height={50} alt="Send Icon" className={`${message==""? style.disabled:""}`}></Image>
                </button>
            </form>
        </div>
    );
}