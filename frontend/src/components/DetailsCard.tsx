import {CocktailModel} from "./Model";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {postToFavourites} from "../apiServices/service";


export interface DetailsCardProps{
    drinkDetails: CocktailModel
    source:string
    spotsLeft:number
    checkLength: () => void


}

export default function DetailsCard({drinkDetails,source,spotsLeft,checkLength}: DetailsCardProps) {

    const[error, setError] = useState("")


    const nav =useNavigate()



    const handleClick = () =>{
        postToFavourites(drinkDetails.idDrink,source)
            .then(() => nav(`/favourites`))
            .catch((error)=> {if (error.response.status === 400){
                setError("Only 5 favourites are allowed!")
            }
            else if(error.response.status === 403) {
                localStorage.removeItem("jwt")
                nav("/")
            }

            })
    }
    return(
        <div>
                <div>
                    <div className={"heading_details"}>{drinkDetails.strDrink}</div>
                    <div>
                        <img className={"detailDrinkPhoto"} src={drinkDetails.strDrinkThumb} alt={""}/>
                    </div>
                    <button disabled={!(spotsLeft > 0)}  className="btn btn-warning" onClick={() => {
                        handleClick();
                        checkLength();
                    }}>Add to favourites</button>
                    <div className={"alertSpots"}>{spotsLeft} spot(s) left for your favs! </div>
                    {(spotsLeft === 0) && <div className={"error"}>{error}
                        <br/>
                        <button onClick={()=> nav("/favourites")}>back to favourites</button>
                    </div>}

                    <div className={"heading_details"}>Instructions:</div>
                    <div>{drinkDetails.strInstructions}</div>
                    <label className={"heading_details"}>Ingredients:</label>
                    <div><span>{drinkDetails.strMeasure1}</span>{drinkDetails.strIngredient1}</div>
                    <div><span>{drinkDetails.strMeasure2}</span> {drinkDetails.strIngredient2}</div>
                    <div><span>{drinkDetails.strMeasure3}</span> {drinkDetails.strIngredient3}</div>
                    <div><span>{drinkDetails.strMeasure4}</span> {drinkDetails.strIngredient4}</div>
                    <div><span>{drinkDetails.strMeasure5}</span> {drinkDetails.strIngredient5}</div>
                    <div><span>{drinkDetails.strMeasure6}</span> {drinkDetails.strIngredient6}</div>
                    <div><span>{drinkDetails.strMeasure7}</span> {drinkDetails.strIngredient7}</div>
                    <label className={"heading_details"}>Glass:</label>
                    <div>{drinkDetails.strGlass}</div>


                </div>
        </div>

    )
}