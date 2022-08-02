

import {useNavigate} from "react-router-dom";
import React from "react";
import "./Home.css"




export default function Home() {

    const nav = useNavigate()


    return(
        <div className="d-grid gap-2 col-6 mx-auto">
            <div className={"loggedInUser"}>{localStorage.getItem("username")} is logged in</div>


            <button type="button" className="btn btn-light" onClick={() => nav("/ingredient")}>show all ingredients</button>
            <br/>
            <button type="button" className="btn btn-light" onClick={() => nav("/favourites")}>show my favourites</button>
            <br/>
            <button type="button" className="btn btn-light" onClick={() => nav("/customDrink")}>create your own drink</button>


        </div>
    )
}