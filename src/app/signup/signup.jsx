'use client';
import style from "./signup.module.css";
import { useRouter } from "next/navigation";
import Image from 'next/image';

const { useState, useRef, useEffect } = require("react");

export default function Signup(){
    const [username, setusername] = useState("")
    const [password, setpassword] = useState("")
    const [repassword, setrepassword] = useState("")
    const [isDarkMode, setIsDarkMode] = useState(false);
    const router = useRouter()
    const myElement = useRef(null);

    //API ENDPOINT
    const baseUrl = process.env.NEXT_PUBLIC_API_URL
    

    useEffect(()=>{
        if(myElement.current){
            myElement.current.style.display = (password==repassword)? "none": "inline";
        }
    }, [repassword, password])

    useEffect(() => {
        // Check saved theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            setIsDarkMode(true);
            document.body.classList.add('dark-theme');
        }
    }, []);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
        if (!isDarkMode) {
            document.body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.remove('dark-theme');
            localStorage.setItem('theme', 'light');
        }
    };

    const handleSignup = async (event)=>{
        event.preventDefault()
       
        const url = `${baseUrl}/account`

        
        let user = {
            username: username,
            password: password
        }

        try{
            let response = await fetch(url, {
                method: "POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(user)
            })
        
        if(response.status == 201){
            let data = await response.json()
            router.push("/login")
        }else{
            console.error("Failed to sign up")
        }
        }catch(e){
            console.log(e)
        }
    }

    const signupPage = (
        <div className={style.container}>
            <div className={style.header}>
                <h1>Study App</h1>
                <p>Create an account to start collaborating</p>
            </div>
            <form action="#" className={style.form} onSubmit={handleSignup}>
                <section className={style.inputField}>
                    <label htmlFor="username">Username</label>
                    <input type="text" className={style.input} name="usernmae" onChange={(event)=>setusername(event.target.value)} value={username} placeholder="username" required/>
                </section>

                <section className={style.inputField}>    
                    <label htmlFor="password">
                        Password:
                    </label>
                    <input type="password" required onChange={(event=> setpassword(event.target.value))} className={style.input} value={password} placeholder="Password" name="password"/>
                </section>

                <section className={style.inputField}>
                    <label htmlFor="re-enter-password">
                        Re-enter password:
                    </label>
                    <input type="password" required value={repassword} onChange={(event)=>setrepassword(event.target.value)} className={style.input} placeholder="Re-enter Password" name="re-enter"/>
                </section>

                <section className={style.inputField}>
                    <p>
                        <span className={style.warn} ref={myElement}>Passwords do not match</span>   
                    </p>
                    <input type="submit" value="Sign Up" className={style.signup} />  
                </section>
            </form>
            <div className={style.footer}>
                <p>Already have an account? <a href="/login" className={style.link}>Log in</a></p>
            </div>
        </div>
    );

    return (
        <div className={style.wrapper}>
            <button 
                className={style.themeButton}
                onClick={toggleTheme}
                aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
                <Image 
                    src={isDarkMode ? "/image/light_mode.svg" : "/image/dark_mode.svg"} 
                    width={24} 
                    height={24} 
                    alt="Toggle theme" 
                />
            </button>
            {signupPage}
        </div>
    );
}

