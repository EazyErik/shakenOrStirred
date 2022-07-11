
import {useEffect} from "react";
import "./Registration.css"

export default function Registration() {

    useEffect(() => {

    },[])


    return(
        <div>
            <form className={"registration"}>
                <p>Please register:</p>
                <label>username</label>
                <input type={"text"} placeholder={"enter your username:"}/><br/>
                <label>password</label>
                <input type={"password"} placeholder={"enter your password:"}/>
                <br/>

                <button >register</button>
            </form>
        </div>
    )
}