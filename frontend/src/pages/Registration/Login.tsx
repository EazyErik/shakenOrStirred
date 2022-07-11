
import "./Login.css"
import {useNavigate} from "react-router-dom";
import {FormEvent, useState} from "react";
import {loginNow} from "../../apiServices/service";


export default function Login() {
    const nav = useNavigate()

    const [username,setUsername] = useState("")
    const[password,setPassword] = useState("")
    const[passwordAgain, setPasswordAgain] = useState("")
    const[error,setError] = useState("")

    const login = (event:FormEvent) => {
        event.preventDefault()
        loginNow(username,password,passwordAgain)
            .then(loginResponse=> localStorage.setItem("jwt",loginResponse.token))
            .then(() => nav("/home"))
            .catch(() => setError("Passwords do not match!"))



    }

    return(
        <div className={"Login"}>
            <h1>Please Login:</h1>
            <form onSubmit={login}>
                <input type={"text"} placeholder={"Username"} onChange={event => setUsername(event.target.value)}/>
                <input type={"password"} placeholder={"Password"} onChange={event => setPassword(event.target.value)}/>
                <input type={"password"} placeholder={"Password again"} onChange={event => setPasswordAgain(event.target.value)}/>
                <input type={"submit"} value={"Login now"} />
            </form>
            {error && <div>{error}</div>}
            {password != passwordAgain ? "Passwords dont match" :""}
            <div className={"signUp"}>
                <h3>Don't have an account yet?</h3>

                <button onClick={() => nav("/register")}> Sign up</button>
            </div>

        </div>
    )

 }