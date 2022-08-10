
import {FormEvent,useState} from "react";
import "./Registration.css"
import {createUser} from "../apiServices/service";
import {useNavigate} from "react-router-dom";

export default function Registration() {

    const[username,setUsername] = useState("")
    const[password,setPassword] = useState("")
    const[passwordAgain, setPasswordAgain] = useState("")
    const[error,setError] = useState("")
    const nav = useNavigate()

  const register = (event:FormEvent) => {
        event.preventDefault()
      createUser(username,password,passwordAgain)
          .then(() => nav("/"))
          .catch(() => setError("Registration failed. Please try again"))

  }


    return (

        <div className={"registration"}>
            <h1>Please register:</h1>
            <form onSubmit={register}>
                <div className={"text"}><input data-testid={"username-field"} type={"text"} placeholder={"Username"}
                                               value={username} onChange={event => setUsername(event.target.value)}/>
                </div>
                <div className={"password"}><input data-testid={"password-field"} type={"password"}
                                                   placeholder={"Password"} value={password}
                                                   onChange={event => setPassword(event.target.value)}/></div>
                <div className={"passwordAgain"}><input data-testid={"passwordAgain-field"} type={"password"}
                                                        placeholder={"Password again"}
                                                        value={passwordAgain}
                                                        onChange={event => setPasswordAgain(event.target.value)}/></div>
                <input data-testid={"submit-button"} type={"submit"} value={"Register now"}/>

            </form>
            <span data-testid={"registration-output"}>{username}</span>
            <div data-testid={"error"}>
                {error}
            </div>
        </div>
    )
}