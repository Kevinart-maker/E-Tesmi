import { useState } from "react";
import { useLogin } from '../hooks/useLogin'
import { useSignup } from "../hooks/useSignup";

const Login = () => {
    const [hide, setHide] = useState(true);
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ name, setName ] = useState('')
    const [ number, setNumber ] = useState('')
    const { login, error, loading, msg } = useLogin()
    const { signup, error: signupError, msg: signupMsg, success } = useSignup()

    const handleSignUp = async (e) =>{
        e.preventDefault();
        await signup(name, email, password, number)
    }
    
    const handleSubmit = async (e)=>{
        e.preventDefault()
        await login(email, password)
    }

    const handleHide = () =>{
        setHide(!hide)
    }

    const show = hide ? 'hide' : ''
    const visible = hide ? 'show' : ''
    const seeSuccess = success ? 'not-show' : ''
    const notSeeSuccess = success ? 'show' : ''

    
    return (
        <section className="login">
            <div className="login-hero">
                <img src="/TESMI beta assets/logo.png" alt="" />
                <h2>Sign in or create an account</h2>
            </div>
            <div className="login-card">
                {(signupMsg || msg) && (<div className="success-msg">{msg}{signupMsg}</div>)}
                <div className={`signin ${show} ${notSeeSuccess}`}>
                    <div className="heading">
                        <h1>Sign in</h1>
                        <p>New User? <span onClick={handleHide}>Create an account</span></p>
                    </div>

                    <div className="input">
                        <label>
                            <p>Email address</p>
                            <input 
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                            />
                        </label>
                        <label>
                            <p>Password</p>
                            <input 
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                            />
                        </label>
                        <button onClick={handleSubmit}>Continue</button>
                    </div>
                    {error && (<div className="error-msg">{error}</div>)}
                </div>
                <div className={`signup ${visible} ${seeSuccess}`}>
                    <div className="heading">
                        <h1>Create an account</h1>
                        <p>Already have an account? <span onClick={handleHide}>Sign in</span></p>
                    </div>

                    <div className="input">
                    <label>
                            <p>Name</p>
                            <input 
                                type="name"
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                            />
                        </label>
                        <label>
                            <p>Email address</p>
                            <input 
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                            />
                        </label>
                        <label>
                            <p>Phone Number</p>
                            <input 
                                type="number"
                                onChange={(e) => setNumber(e.target.value)}
                                value={number}
                            />
                        </label>
                        <label>
                            <p>Password</p>
                            <input 
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                            />
                        </label>
                        <button onClick={handleSignUp}>Continue</button>
                    </div>
                    {signupError && (<div className="error-msg">{signupError}</div>)}
                </div>
            </div>
        </section>
    );
}
 
export default Login;