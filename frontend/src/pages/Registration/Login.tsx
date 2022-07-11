
import "./Login.css"


export default function Login() {





    return(
        <div >

            <form className={"login"} >
                <label>username</label>
                <input type={"text"} placeholder={"enter your username:"}  onChange={event => event.target.value}/><br/>
                <label>password</label>
                <input type={"password"} placeholder={"enter your password:"}  onChange={event => event.target.value}/>
                <label> repeat password</label>
                <input type={"password"} placeholder={"enter your password again:"} onChange={event => event.target.value}/>
                <br/>
                <button>login</button>
                <br/>
                <div className={"accountQuestion"}>No account yet? Please register:</div>
                 <button >register</button>
            </form>
        </div>
    )
}