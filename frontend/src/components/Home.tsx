

import {useNavigate} from "react-router-dom";




export default function Home() {

    const nav = useNavigate()


    return(
        <div className="d-grid gap-2 col-6 mx-auto">


            <button className={"btn btn-black"} type={"button"} onClick={() => nav("/ingredient")}>show all ingredients</button>
            <br/>
            <button onClick={() => nav("/favourites")}>show my favorites</button>
            <br/>
            <button onClick={() => nav("/drinkDay")}>show cocktail of the day</button>


        </div>
    )
}