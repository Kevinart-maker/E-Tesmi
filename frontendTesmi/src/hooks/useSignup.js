import { useState } from "react";
import { useNavigate } from 'react-router-dom';


export const useSignup = ()=>{
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);
    const [success, setSuccess] = useState(false)
    const [msg, setMsg] = useState('')
    const navigate = useNavigate()

    const signup = async(name, email, password, mobileNo)=>{
        setLoading(true)
        setError(null)

        const response = await fetch('https://backend-tesmi.vercel.app/users/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name, email, password, mobileNo})
        })
        const json = await response.json()

        if(!response.ok){
            setLoading(false)
            setError(json.msg)
        }
        if(response.ok){
            setSuccess(true)
            setLoading(false)
            setMsg('User created successfully')
        }
    }

    return{ signup, loading, error, msg, success }
}