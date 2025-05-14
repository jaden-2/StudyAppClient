"use client"

import { useState } from "react"

export default function confirmModal ({message, onConfirm, onCancel}){
    return(
            <>
                {message}
                <button type="button" onClick={onConfirm}>Confirm</button>
                <button type="button" onClick={onCancel}>reject</button>
            </>
        )
    }
