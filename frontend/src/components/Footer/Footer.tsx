import {NavLink} from "react-router-dom";
import React from "react";

export default function Footer() {
    return(
        <div className={"Menu"}>
            <NavLink className={({isActive}) => isActive ? "active" : "not-active"} to={"/main"} >Home</NavLink>
            <NavLink className={({isActive}) => isActive ? "active" : "not-active"}  to={"/ingredient"} >ShoppingList</NavLink>
            <NavLink className={({isActive}) => isActive ? "active" : "not-active"} to={"/category"} >Favourites</NavLink>

        </div>
    )
}