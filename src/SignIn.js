import React, { useState, useEffect } from 'react'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from './Firebase';
import { useNavigate } from 'react-router-dom';
import spinner from './assets/Spinner.svg';
import loginBG from './assets/loginbg.jpg';

const SignIn = () => {

    const navigate = useNavigate()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)


    const handleClick = async () => {

        setLoading(true)

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                const accessToken = user.accessToken
                setLoading(false)
                localStorage.setItem("accessToken", accessToken)
                navigate('/admin')
            })
            .catch((error) => {
                const errorMessage = error.message;

                setError(true)
                setLoading(false)
            });
    }

    return (
        <div className='login_page' style={{ minHeight: "100dvh", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div
                style={{ backgroundColor: "#FFFFFF", margin: "1.5rem", maxWidth: "400px", width: "100%", padding: "1rem" }}>
                <h3 style={{ textAlign: "center", marginBottom: "20px" }}>Sign In </h3>
                <input className='input'
                    style={{ height: "40px", padding: "7px", width: "100%" }}
                    placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} onClick={() => setError(false)} />
                <br /><br />
                <input
                    style={{ height: "40px", padding: "7px", width: "100%" }}
                    className='input' type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} onClick={() => setError(false)} />
                <br /><br />
                <button className='btn btn-primary' style={{ width: "100%" }}
                    onClick={() => { handleClick() }}
                >{loading ? <img src={spinner} width={"25px"} /> : 'Sign in'} </button>
                {error && <p style={{ textAlign: "center", marginTop: "5px" }}>Wrong email and password</p>}
            </div>
        </div>
    )
}

export default SignIn
