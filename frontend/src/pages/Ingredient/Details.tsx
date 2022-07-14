import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getDrink, postToFavourites} from "../../apiServices/service";
import {DetailModel} from "../../components/Model";
import "./Details.css"





export default function Details() {
    const {details} = useParams()
    const[detail,setDetail] = useState<DetailModel>()
    const nav = useNavigate()

    useEffect(() => {
        getDrink(details)
            .then(data => setDetail(data))

    },[details])

    const handleClick = () =>{
        postToFavourites(details)
            .then(() => nav(`/favourites`))


    }

    return(
        <div className={"detailPage"}>
            {detail &&
                <div>
                    <div>{detail.drinks[0].strDrink}</div>




                    <div>
                    <img className={"detailDrink"} src={detail.drinks[0].strDrinkThumb} alt={""}/>
                    </div>
                    <button onClick={handleClick}>I like</button>
                    <div>{detail.drinks[0].strInstructions}</div>
                    <div>{detail.drinks[0].strIngredient1}</div>
                    <div>{detail.drinks[0].strIngredient2}</div>
                    <div>{detail.drinks[0].strIngredient3}</div>
                    <div>{detail.drinks[0].strIngredient4}</div>
                    <div>{detail.drinks[0].strGlass}</div>
                    <div>{detail.drinks[0].strMeasure1}</div>
                    <div>{detail.drinks[0].strMeasure2}</div>
                    <div>{detail.drinks[0].strMeasure3}</div>

                </div>}
        </div>
    )
}