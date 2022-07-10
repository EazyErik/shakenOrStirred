

import {useNavigate} from "react-router-dom";



export default function Home() {

    const nav = useNavigate()







    return(
        <div className={"Home"}>


            <button onClick={() => nav("/ingredient")}>show all ingredients</button>
            <button onClick={() => nav("/favourites")}>show my favorites</button>
            <button onClick={() => nav("/drinkDay")}>show cocktail of the day</button>


        </div>
    )
}