'use client';
import Message from "@components/msg/message";
import style from "./group.module.css"
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Client } from "@stomp/stompjs";
import ShareGroup from "./shareGroup";
import FancyDisplay from "../test/FancyDisplay";
import LeaveGroup from "./leaveGroup";

export default function Group({groupData}) {
    const {group, goHome} = groupData
    let [messages, setMessages] = useState(group.messages)
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [shareGroupVisible, setShareGroupVisible] = useState(false)
    const [showLeaveDialog, setShowLeaveDialog] = useState(false)
    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const closeShareGroup = ()=>{
        setShareGroupVisible(!shareGroupVisible)
    }

    function handleLeaveGroup(){

    }
    function setShowLeaveDialogFunc(){
        setShowLeaveDialog(!showLeaveDialog)
    }
    const [message, setMessage] = useState("")
    var clientRef = useRef(null);

 
 
    useEffect(()=>{
        if(!group)
            return;
        const token = localStorage.getItem("jwtToken")

        if(!token)
            return;

        const client = new Client({
           brokerURL: `ws://localhost:9000/ws-studyApp?token=${token}`,
            
            connectHeaders: {
                Authorization: `Bearer ${token}`
            },
            onConnect: (stage)=>{
                console.log(`Connected to ${stage}`)
                client.subscribe(`/sock/studyApp/topic/${group.groupId}`, (message)=>{
                    try{
                    const msg = JSON.parse(message.body)
                    setMessages([...messages, msg])
                    
                }catch(e){
                    console.error(e)
                }
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
        "session": {
            id: group.id,
            groupId: group.groupId,
            title: group.title,
            description: group.description
        }
        }
       
        clientRef.current.publish({
            destination: "/sock/studyApp/group/chat", 
            body: JSON.stringify(msgDto)
        })
        
        setMessage("")
        
    }
    
    return (
        <div className={style.groupContainer}>
            <header className={style.header}>
                <div className={style.headerLeft}>
                    <button 
                        className={style.iconButton} 
                        onClick={goHome}
                        aria-label="Go back"
                    >
                        <Image src="/image/arrow_back.svg" width={24} height={24} alt="" />
                    </button>
                    <h2 className={style.groupTitle}>{group.title}</h2>
                </div>
                
                <div className={style.headerActions}>
                    <button 
                        className={style.iconButton}
                        onClick={toggleDropdown}
                        aria-label="More options"
                    >
                        <Image src="/image/more.svg" width={24} height={24} alt="" />
                    </button>
                    
                    <div className={`${style.dropdown} ${dropdownVisible ? style.show : ''}`}>
                        <button onClick={closeShareGroup} className={style.dropdownItem}>
                            <Image src="/image/share.svg" width={20} height={20} alt="" />
                            Share Group
                        </button>
                        <button onClick={setShowLeaveDialogFunc} className={style.dropdownItem}>
                            <Image src="/image/leave.svg" width={20} height={20} alt="" />
                            Leave Group
                        </button>
                        <button onClick={() => alert(group.description)} className={style.dropdownItem}>
                            <Image src="/image/info.svg" width={20} height={20} alt="" />
                            View Details
                        </button>
                    </div>
                </div>
            </header>

            <div className={style.messageContainer}>
                <div className={style.messageList}>
                    {messages.map((message, index) => (
                        <div key={index} className={style.messageWrapper}>
                            <Message props={message}/>
                        </div>
                    ))}
                </div>
                
                <form onSubmit={sendMessage} className={style.messageForm}>
                    <textarea 
                        name="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type a message..."
                        className={style.messageInput}
                    />
                    <button 
                        type="submit" 
                        className={`${style.sendButton} ${message === "" ? style.disabled : ""}`}
                        disabled={message === ""}
                    >
                        <Image 
                            src="/image/send.svg" 
                            width={24} 
                            height={24} 
                            alt="Send" 
                            className={style.sendIcon}
                        />
                    </button>
                </form>
            </div>

            {shareGroupVisible && (
                <FancyDisplay>
                    <ShareGroup 
                        groupId={group.groupId} 
                        onClose={closeShareGroup}
                    />
                </FancyDisplay>
            )}
            {
                showLeaveDialog && (
                <FancyDisplay>
                    <LeaveGroup 
                        groupName={group.title}
                        onConfirm={() => handleLeaveGroup()}
                        onCancel={() => setShowLeaveDialogFunc()}
                    />
                 </FancyDisplay>
                )
            }
        </div>
    );
}
