
import "./Login.css"
import {useNavigate} from "react-router-dom";
import {FormEvent, useEffect, useState} from "react";
import {loginNow} from "../../apiServices/service";


export default function Login() {
    const nav = useNavigate()

    const [username,setUsername] = useState("")
    const[password,setPassword] = useState("")
    const[error,setError] = useState("")



    //no need to login if token is still valid
    useEffect(()=> {
        if(localStorage.getItem("jwt") !== null && localStorage.getItem("jwt") !== undefined) {
            nav("/home")
        }



    },[])


    const login = (event:FormEvent) => {
        event.preventDefault()
        loginNow(username,password)
            .then(loginResponse=> {localStorage.setItem("jwt",loginResponse.token)
                localStorage.setItem("username",username)
            console.log(loginResponse)})

            .then(() => nav("/home"))
            .catch(() => setError("Password is wrong!"))



    }

    return(
        <div className={"Login"}>
            <h1>Please Login:</h1>
            <form onSubmit={login}>
                <input type={"text"} placeholder={"Username"} onChange={event => setUsername(event.target.value)}/>
                <input type={"password"} placeholder={"Password"} onChange={event => setPassword(event.target.value)}/>
                <input type={"submit"} value={"Login now"} />
            </form>
            {error && <div>{error}</div>}


            <div className={"signUp"}>
                <h3>Don't have an account yet?</h3>

                <button onClick={() => nav("/register")}> Sign up</button>
            </div>

        </div>
    )

 }