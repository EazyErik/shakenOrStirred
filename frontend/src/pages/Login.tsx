
import "./Login.css"
import {useNavigate} from "react-router-dom";
import React, {FormEvent, useEffect, useState} from "react";
import {loginNow} from "../apiServices/service";


export default function Login() {
    const nav = useNavigate()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")



    //no need to login if token is still valid
    useEffect(()=> {
        if(localStorage.getItem("jwt") !== null && localStorage.getItem("jwt") !== undefined) {
            nav("/home")
        }


//   eslint-disable-next-line react-hooks/exhaustive-deps
    },[])


    const login = (event:FormEvent) => {
        event.preventDefault()
        loginNow(username,password)
            .then(loginResponse=>
            {
                localStorage.setItem("jwt",loginResponse.token)
                localStorage.setItem("username",username)
            })

            .then(() => nav("/home"))
            .catch(() => setError("Password is wrong!"))



    }


    return(
        <div className={"login"}>
            <h1>Please Login:</h1>
            <form onSubmit={login}>
                <div className={"text"}>
                    <input data-testid={"username-field"} type={"text"} placeholder={"Username"} value={username}
                           onChange={event => setUsername(event.target.value)}/>
                </div>
                <div>
                    <input data-testid={"password-field"} type={"password"} placeholder={"Password"} value={password}
                           onChange={event => setPassword(event.target.value)}/>
                </div>
                <input data-testid={"submit-button"} type={"submit"} value={"Login now"}/>
            </form>
            <span data-testid={"login-output"}>{username}</span>
            <span data-testid={"login-output-password"}>{password}</span>
            {error &&
                <div data-testid={"error"}>{error}</div>}


            <div className={"signUp"}>
                <h3>Don't have an account yet?</h3>

                <button onClick={() => nav("/register")}> Sign up</button>
            </div>

        </div>
    )

 }