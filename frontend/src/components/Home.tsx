

import {useNavigate} from "react-router-dom";




export default function Home() {

    const nav = useNavigate()


    return(
        <div className="d-grid gap-2 col-6 mx-auto">


            <button type="button" className="btn btn-light" onClick={() => nav("/ingredient")}>show all ingredients</button>
            <br/>
            <button type="button" className="btn btn-light" onClick={() => nav("/favourites")}>show my favourites</button>
            <br/>
            <button type="button" className="btn btn-light" onClick={() => nav("/ownDrink")}>create your own drink</button>


        </div>
    )
}