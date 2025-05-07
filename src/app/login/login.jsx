'use client';
import { useState } from "react";
import styles from "./login.module.css"


export default function Login(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("")

    let user = {
        username: username,
        password: password
    }
    const update = (e,  callBack)=>{callBack(e.target.value)}


    const loginPage = <div className="container">
        <form action="" className={styles.form} onSubmit={(e)=>handleLogin(e, user)}>
            <div className={styles.inputField}>
            <label htmlFor="username">Username</label>
            <input name="username" type="text" value={username} onChange={(e)=> update(e, setUsername)} className={styles.input} placeholder="Username" required />
            </div>
            <div className={styles.inputField}>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" value={password} onChange={e => update(e, setPassword)} className={styles.input} placeholder="Password" required/>
            </div>    
            <button type="submit">Log in</button>    
        </form>
    </div>
    return loginPage
}


const handleLogin = async (event, cred)=>{
    event.preventDefault()
    const url = "http://localhost:9000/api/studyApp/auth/login"
    try{
        let response = await fetch(
            url, 
            {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(cred)                
            }
        )

        if(response.status == 200){
            let responseData = await response.json()
            localStorage.setItem("token", responseData.token)
            console.log(responseData)
        }else{
            let responseDate = await response.json()
            console.error(responseDate)
        }
    }catch(e){
        console.error(e)
    }
}
