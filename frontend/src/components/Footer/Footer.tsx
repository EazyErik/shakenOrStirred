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
            <button className={"home-button"}  onClick={()=>nav("/home")}>Home</button>
            <button className={"logout-button"} onClick={logout}>Logout </button>
            <button className={"search-button"} onClick={()=> nav("/search")}>Search</button>

        </div>
    )
}