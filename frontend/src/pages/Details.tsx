import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {
    getCustomDrink,
    getDrink,
    postToFavourites,
    showMyFavourites
} from "../apiServices/service";
import {CocktailModel, CustomDrinkModel, DetailModel} from "../components/Model";
import "./Details.css"


export default function Details() {
    const {details,source} = useParams()
    const[detail,setDetail] = useState<DetailModel>()
    const[customDrink, setCustomDrink] = useState<CocktailModel>()
    const[spotsLeft,setSpotsLeft] = useState(5)

    const maxNumberOfEmptySpots = 5;

    const[error, setError] = useState("")
    const nav = useNavigate()

    useEffect(() => {
        console.log(source)
        numberOfFavourites()
        if(source === "public_api"){
            getDrink(details)
                .then(data => setDetail(data))
        }
        else{
            getCustomDrink(details)
                .then(data => {
                    setCustomDrink(data)
                })
        }



// eslint-disable-next-line react-hooks/exhaustive-deps
    },[details])

    const handleClick = () =>{
        postToFavourites(details,source)
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

    const numberOfFavourites = () => {

        showMyFavourites()
            .then(data => {setSpotsLeft( maxNumberOfEmptySpots - data.length )
                console.log(data.length)
          })
    }


    return(
        <div>
        <div>
            {customDrink && source === "db" && <div>


                <div className={"heading_details"} >{customDrink.strDrink}</div>
                <img className={"detailDrinkPhoto"} src={customDrink?.strDrinkThumb} alt="cocktail"/>
                <button disabled={!(spotsLeft > 0)} className="btn btn-warning"   onClick={() => {
                    handleClick();
                    numberOfFavourites();

                }}>Add to </button>
                <div className={"alertSpots"}>{spotsLeft} spot(s) left for your favs! </div>
                {spotsLeft === 0 && <div className={"error"}>{error}
                    <br/>
                    <button onClick={()=> nav("/favourites")}>back to favourites</button>
                </div>}
                <div className={"heading_details"}>Instructions:</div>
                <div>
                    {customDrink.strInstructions}
                </div>
                <label className={"heading_details"}>Ingredients:</label>

                <div>
                    <div><span>{customDrink.strMeasure1}</span>{customDrink.strIngredient1}</div>
                    <div><span>{customDrink.strMeasure2}</span> {customDrink.strIngredient2}</div>
                    <div><span>{customDrink.strMeasure3}</span> {customDrink.strIngredient3}</div>
                    <div><span>{customDrink.strMeasure4}</span> {customDrink.strIngredient4}</div>
                    <div><span>{customDrink.strMeasure5}</span> {customDrink.strIngredient5}</div>
                    <div><span>{customDrink.strMeasure6}</span> {customDrink.strIngredient6}</div>
                    <div><span>{customDrink.strMeasure7}</span> {customDrink.strIngredient7}</div>

                </div>


                <div className={"heading_details"}>Glass:</div>
                <div>
                    {customDrink.strGlass}
                </div>

            </div>}
        </div>


        <div className={"detailPage"}>

            {detail && source === "public_api" &&
                <div>
                    <div className={"heading_details"}>{detail.drinks[0].strDrink}</div>
                    <div>
                        <img className={"detailDrinkPhoto"} src={detail.drinks[0].strDrinkThumb} alt={""}/>
                    </div>
                    <button disabled={!(spotsLeft > 0)}  className="btn btn-warning" onClick={() => {
                        handleClick();
                        numberOfFavourites();
                    }}>Add to favourites</button>
                    <div className={"alertSpots"}>{spotsLeft} spot(s) left for your favs! </div>
                    {(spotsLeft === 0) && <div className={"error"}>{error}
                        <br/>
                        <button onClick={()=> nav("/favourites")}>back to favourites</button>
                    </div>}

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
        </div>
    )
}