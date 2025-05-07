'use client';
import style from "./signup.module.css";

const { useState, useRef, useEffect } = require("react");

export default function Signup(){
    const [username, setusername] = useState("Lizzy")
    const [password, setpassword] = useState("")
    const [repassword, setrepassword] = useState("")

    const myElement = useRef(null);

    useEffect(()=>{
        if(myElement.current){
            myElement.current.style.display = (password==repassword)? "none": "inline";
        }
    }, [repassword, password])

    const handleSignup = async (event)=>{
        event.preventDefault()
       
        const url = "http://localhost:9000/api/studyApp/account"

        if(password !== repassword){
            alert("Submission failed")
            return
        }
        
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
            console.log(data)
        }else{
            console.error("Failed to sign up")
        }
        }catch(e){
            console.log(e)
        }
    }

    const signupPage = <div className={"container"}>
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
    </div>

   
    return signupPage;
}

