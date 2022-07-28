import {useNavigate} from "react-router-dom";
import React from "react";
import "./Footer.css"

export default function Footer() {

    const nav = useNavigate()
    const logout = () => {
        localStorage.removeItem("jwt")
        localStorage.removeItem("username")
        nav("/")

    }







    return(
        <div className={"Menu"}>
            <button className={"home-button"}    onClick={()=>nav("/home")}><span className="material-symbols-outlined">
home
</span></button>

            <button className={"logout-button"} onClick={logout}><span className="material-symbols-outlined">
logout
</span></button>

        </div>
    )
}