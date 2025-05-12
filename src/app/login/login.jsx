'use client';
import { useEffect, useRef, useState } from "react";
import styles from "./login.module.css"
import { useRouter } from "next/navigation";


export default function Login(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("")
    const [loader, setLoader] = useState(false)
    const [errorMsg, setErrorMsg] = useState(false)
    const errorElement = useRef(null)
    const router = useRouter()

    let user = {
        username: username,
        password: password
    }

    const update = (e,  callBack)=>{
        callBack(e.target.value)
    }
   
    const handleLogin = async (event)=>{
        event.preventDefault()
        setLoader(true);
        const url = "http://localhost:9000/api/studyApp/auth/login"
        try{
            let response = await fetch(
                url, 
                {
                    method: "POST",
                    headers: {
                        'Content-Type': "application/json"
                    },
                    body: JSON.stringify(user)                
                }
            )
    
            if(response.status == 200){
                let responseData = await response.json()
                localStorage.setItem("jwtToken", responseData.token)
                console.log(responseData)
                router.push("/")
            }else{
                let responseDate = await response.json()
                console.error(responseDate)
                setErrorMsg(true)
            }
        }catch(e){
            console.error(e)
        }finally{
            setLoader(false)
        }
    }    

    return (
        <>
        {
            loader && (
                <div  className={styles.loader}>
                    <div></div>
                </div>
            )
        }
        <div className={styles.container}>
            <form action="" className={styles.form} onSubmit={e=> handleLogin(e)}>
                <div className={styles.inputField}>
                <label htmlFor="username">Username</label>
                <input name="username" type="text" value={username} onChange={(e)=> update(e, setUsername)} className={styles.input} placeholder="Username" required />
                </div>
                <div className={styles.inputField}>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" value={password} onChange={e => update(e, setPassword)} className={styles.input} placeholder="Password" required/>
                </div>
                <span className={styles.invalid}
                style={{display: errorMsg? "inline": "none"}}
                >Invalid username or password</span>    
                <button type="submit" >Log in</button>    
            </form>
        </div>
        </>
    )
}


