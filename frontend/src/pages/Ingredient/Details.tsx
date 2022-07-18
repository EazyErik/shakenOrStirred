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
                    <div className={"heading_details"}>{detail.drinks[0].strDrink}</div>
                    <div>
                        <img className={"detailDrink"} src={detail.drinks[0].strDrinkThumb} alt={""}/>
                    </div>
                    <button type="button" className="btn btn-danger" onClick={handleClick}>Add to favourites</button>

                    <div className={"heading_details"}>Instructions:</div>
                    <div>{detail.drinks[0].strInstructions}</div>
                    <label className={"heading_details"}>Ingredients:</label>
                    <div><span>{detail.drinks[0].strMeasure1}</span>{detail.drinks[0].strIngredient1}</div>
                    <div><span>{detail.drinks[0].strMeasure2}</span> {detail.drinks[0].strIngredient2}</div>
                    <div><span>{detail.drinks[0].strMeasure3}</span> {detail.drinks[0].strIngredient3}</div>
                    <div><span>{detail.drinks[0].strMeasure4}</span> {detail.drinks[0].strIngredient4}</div>
                    <div><span>{detail.drinks[0].strMeasure5}</span> {detail.drinks[0].strIngredient5}</div>
                    <div><span>{detail.drinks[0].strMeasure6}</span> {detail.drinks[0].strIngredient6}</div>
                    <div><span>{detail.drinks[0].strMeasure7}</span> {detail.drinks[0].strIngredient7}</div>
                    <label className={"heading_details"}>Glass:</label>
                    <div>{detail.drinks[0].strGlass}</div>


                </div>}
        </div>
    )
}