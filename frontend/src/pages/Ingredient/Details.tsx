import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getDrink, postToFavourites} from "../../apiServices/service";
import {DetailModel} from "../../components/Model";


export default function Details() {
    const {details} = useParams()
    const[detail,setDetail] = useState<DetailModel>()
    const nav = useNavigate()

    useEffect(() => {
        getDrink(details)
            .then(data => {setDetail(data)
            console.log(data)}
            )

    },[details])

    const handleClick = () =>{
        postToFavourites(details)
            .then(() => nav(`/favourites=${details}`))


    }

    return(
        <div>
            {detail &&
                <div>
                    <div>{detail.drinks[0].strDrink}</div>
                    <img src={detail.drinks[0].strDrinkThumb} alt={""}/>
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