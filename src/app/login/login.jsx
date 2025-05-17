'use client';
import { useEffect, useRef, useState } from "react";
import styles from "./login.module.css"
import { useRouter } from "next/navigation";

export default function Login(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("")
    const [loader, setLoader] = useState(false)
    const [errorMsg, setErrorMsg] = useState(false)
    const router = useRouter()
    
    //API ENDPOINT
    const baseUrl = process.env.NEXT_PUBLIC_API_URL
    
    // Add useEffect to check dark mode preference
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
        }
    }, []);

    let user = {
        username: username.trim(),
        password: password
    }

    const update = (e,  callBack)=>{
        callBack(e.target.value)
    }
   
    const handleLogin = async (event)=>{
        event.preventDefault()
        setLoader(true);
        const url = `${baseUrl}/auth/login`
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
                localStorage.setItem(`jwtToken`, responseData.token)
                
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
        <div className={styles.wrapper}>
            {loader && (
                <div className={styles.loaderContainer}>
                    <div className={styles.loaderSpinner}></div>
                </div>
            )}
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1>Welcome Back!</h1>
                    <p>Log in to your Study App account</p>
                </div>
                <form className={styles.form} onSubmit={e => handleLogin(e)}>
                    <div className={styles.inputField}>
                        <label className={styles.label} htmlFor="username">Username</label>
                        <input 
                            name="username" 
                            type="text" 
                            value={username} 
                            onChange={(e)=> update(e, setUsername)} 
                            className={styles.input} 
                            placeholder="Username" 
                            required 
                        />
                    </div>
                    <div className={styles.inputField}>
                        <label className={styles.label} htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            name="password" 
                            value={password} 
                            onChange={e => update(e, setPassword)} 
                            className={styles.input} 
                            placeholder="Password" 
                            required
                        />
                    </div>
                    <span 
                        className={styles.errorMessage}
                        style={{display: errorMsg? "inline": "none"}}
                    >
                        Invalid username or password
                    </span>    
                    <button type="submit" className={styles.loginButton}>
                        Login
                    </button>    
                </form>
                <div className={styles.footer}>
                    <p>Don't have an account? <a href="/signup" className={styles.link}>Sign up</a></p>
                </div>
            </div>
        </div>
    )
}


