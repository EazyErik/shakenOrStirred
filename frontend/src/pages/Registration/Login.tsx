import {useNavigate} from "react-router-dom";

export default function Login() {

    const nav = useNavigate()

    return(
        <div>

            <form>
                <label>username</label>
                <input type={"text"} placeholder={"enter your username:"}/><br/>
                <label>password</label>
                <input type={"password"} placeholder={"enter your password:"}/>
                <br/>
                <div>No account yet? Please register:</div>
                 <button onClick={() => nav("/register")}>register</button>
            </form>
        </div>
    )
}