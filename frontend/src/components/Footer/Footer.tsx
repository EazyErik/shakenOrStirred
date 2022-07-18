import {NavLink} from "react-router-dom";
import React from "react";

export default function Footer() {
    return(
        <div className={"Menu"}>
            <NavLink className={({isActive}) => isActive ? "active" : "not-active"} to={"/home"} >Home</NavLink>
            <NavLink className={({isActive}) => isActive ? "active" : "not-active"}  to={"/shopping"} >Admin</NavLink>
            <NavLink className={({isActive}) => isActive ? "active" : "not-active"} to={"/map"} >Google Maps</NavLink>

        </div>
    )
}