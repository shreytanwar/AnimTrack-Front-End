import React, { useState } from 'react'
import './SignUp.css'
import axios from "axios"
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from "react-router-dom"

function SignUp() {
    const BaseURL = "https://animtrack.herokuapp.com";
    const malId = useSelector(state => state.MalId)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")

    const history = useHistory();

    function SignUp() {
        const fetch = async () => {
            const body = { email, password, name }
            const respose = await axios.post(`${BaseURL}/auth/register`, body)
            console.log(respose)
            SignIn()
        }
        fetch()
    }

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
            history.push('/')
            window.location.reload()
        }
        fetch()
    }

    return (
        <div className='SignUp'>

            <div className='SignUpPageTop'>Sign Up</div>
            <form
                className='SignUpPageForm'
                onSubmit={(e) => {
                    e.preventDefault()
                    SignUp()
                }}>
                <div className='SignUpPageNameEmailPassword'>
                    <input
                        className='SignUpPageTextTop'
                        type='text'
                        name='Name'
                        placeholder='Name'
                        onChange={(e) => { setName(e.target.value) }}
                    />
                    <input
                        className='SignUpPageTextMid'
                        type='text'
                        name='E-mail'
                        placeholder='E-mail'
                        onChange={(e) => { setEmail(e.target.value) }}
                    />
                    <input
                        className='SignUpPagePassword'
                        type='password'
                        name='Password'
                        placeholder='Password'
                        onChange={(e) => { setPassword(e.target.value) }}
                    />
                </div>

                <button
                    className='SignUpPageButton'
                    type="button" onClick={SignUp}>SignUp</button>
            </form>
        </div>
    )
}

export default SignUp
