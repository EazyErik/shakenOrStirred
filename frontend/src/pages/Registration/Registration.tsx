
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
          .then(() => nav("/login"))
          .catch(() => setError("Registration failed. Please try again"))

  }


    return(
        <div>
            <form className={"registration"} onSubmit={register}>
                <p>Please register:</p>
                <label>username</label>
                <input type={"text"} placeholder={"enter your username:"} value={username} onChange={event => setUsername(event.target.value)}/><br/>
                <label>password</label>
                <input type={"password"} placeholder={"enter your password:"} value={password} onChange={event => setPassword(event.target.value)}/><br/>
                <label>password again</label>
                <input type={"password"} placeholder={"enter your password again:"} value={passwordAgain} onChange={event => setPasswordAgain(event.target.value)} />
                <br/>

                <button onClick={register} >register</button>
                {error &&
                <div>{error}</div>}
            </form>
        </div>
    )
}