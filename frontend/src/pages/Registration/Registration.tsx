
import {FormEvent,useState} from "react";
import "./Registration.css"
import {createUser} from "../../apiServices/service";
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


    return(
        <div>
            <h1>Please register:</h1>
            <form onSubmit={register} >
                <input type={"text"} placeholder={"Username"} value={username} onChange={event => setUsername(event.target.value)}/>
                <input type={"password"} placeholder={"Password"} value={password} onChange={event => setPassword(event.target.value)}/>
                <input type={"password"} placeholder={"Password again"} value={passwordAgain} onChange={event => setPasswordAgain(event.target.value)}/>
                <input type={"submit"} value={"Register now"}/>

            </form>
            {error}
        </div>
    )
}