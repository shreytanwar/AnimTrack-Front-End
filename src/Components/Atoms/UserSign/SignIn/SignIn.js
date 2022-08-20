import React, { useState, useEffect } from 'react'
import './SignIn.css'
import axios from "axios"
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from "react-router-dom"

function SignIn() {

    const BaseURL = "https://animtrack.herokuapp.com";

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const history = useHistory();

    useEffect(() => {
        if (localStorage.getItem('auth-token') !== null)
            history.push('/')
    }, [])

    function SignIn() {
        const fetch = async () => {
            const body = {
                email,
                password
            }
            if (localStorage.getItem('auth-token') !== null) {
                console.log("ERROR AUTH TOKEN PRESENT")
                return;
            }
            const response = await axios.post(`${BaseURL}/auth/login`, body)
            localStorage.setItem('auth-token', response.headers['auth-token'])
            //useEffect
            window.location.reload()
        }
        fetch()
    }
    return (
        <div className='SignIn'>
            <form
                className='SignInPageForm'
                onSubmit={(e) => {
                    // e.preventDefault() 
                    SignIn()
                }}>
                    <div className='SignInPageTop'>Sign In</div>
                <div className='SignInPageEmailPassword'>
                    <input
                        type='text'
                        name='E-mail'
                        placeholder='e-mail'
                        className='SignInPageText'
                        onChange={(e) => { setEmail(e.target.value) }}
                    />
                    <input
                        type='password'
                        name='Password'
                        placeholder='password'
                        className='SignInPagePassword'
                        onChange={(e) => { setPassword(e.target.value) }}
                    />
                </div>

                <button className='SignInPageButton' type="button" onClick={SignIn}>SignIn</button>
            </form>
        </div>
    )
}

export default SignIn