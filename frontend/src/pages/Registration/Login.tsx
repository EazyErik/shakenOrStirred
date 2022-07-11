import {useNavigate} from "react-router-dom";
import "./Login.css"
import {FormEvent, useState} from "react";

export default function Login() {

    const nav = useNavigate()
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const [passwordAgain,setPasswordAgain] = useState("")

    const register = (event:FormEvent) => {
        event.preventDefault()

    }




    return(
        <div >

            <form className={"login"} onSubmit={register}>
                <label>username</label>
                <input type={"text"} placeholder={"enter your username:"} value={username} onChange={event => event.target.value}/><br/>
                <label>password</label>
                <input type={"password"} placeholder={"enter your password:"} value={password} onChange={event => event.target.value}/>
                <label> repeat password</label>
                <input type={"password"} placeholder={"enter your password again:"} value={passwordAgain}onChange={event => event.target.value}/>
                <br/>
                <button>login</button>
                <br/>
                <div className={"accountQuestion"}>No account yet? Please register:</div>
                 <button onClick={register}>register</button>
            </form>
        </div>
    )
}