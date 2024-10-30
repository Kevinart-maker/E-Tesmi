import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = ()=>{
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);
    const { dispatch } = useAuthContext()
    const [msg, setMsg] = useState('')

    const login = async(email, password)=>{
        setLoading(true)
        setError(null)

        console.log(email, password)
        const response = await fetch('https://backend-tesmi.vercel.app/users/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password}),
        })
        const json = await response.json()

        if(!response.ok){
            setLoading(false)
            setError(json.message)
        }
        if(response.ok){
            // save the user to local storage
            localStorage.setItem('user', JSON.stringify(json))

            // update the auth context
            dispatch({type: 'LOGIN', payload: json})

            setLoading(false)
            setMsg('Login successful!')
        }
    }

    return{ login, loading, error, msg }
}