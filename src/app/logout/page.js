"use client"
import { useRouter } from "next/navigation"
import { useEffect } from "react"


export default function Logout(){
   let router = useRouter()
    
   useEffect(()=>{
    localStorage.removeItem(`jwtToken`)
    router.push("/login")
}, [router])

    return null
}