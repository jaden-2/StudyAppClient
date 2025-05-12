'use client'

import { useEffect, useState } from "react"

export default function useScreenResize(){
    const [screenWidth, setScreenWidth] = useState(undefined)
    
    useEffect(()=>{
        let timeoutId;

        const handleResize = ()=>{
            clearTimeout(timeoutId)
            timeoutId = setTimeout(()=>{
                let newWidth = window.innerWidth
                if(newWidth != screenWidth){
                    setScreenWidth(newWidth)
                }
            }, 200)
        }
        console.log("window width " + screenWidth)
        if(typeof window == "undefined"){
           return
        }
        
        handleResize()
        return ()=>{
            clearTimeout(timeoutId)
            //window.removeEventListener("resize", handleResize) 
        }
    }, [])

    return screenWidth
}