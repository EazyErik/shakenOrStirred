import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {
    getCustomDrink,
    getDrink,
    postToFavourites,
    showMyFavourites
} from "../../apiServices/service";
import {CustomDrinkModel, DetailModel} from "../../components/Model";
import "./Details.css"





export default function Details() {
    const {details,source} = useParams()
    const[detail,setDetail] = useState<DetailModel>()
    const[customDrink, setCustomDrink] = useState<CustomDrinkModel>()
    const[count,setCount] = useState(0)

    const[error, setError] = useState("")
    const nav = useNavigate()

    useEffect(() => {
        console.log(source)
        numberOfFavourites()
        getDrink(details)
            .then(data => setDetail(data))
        getCustomDrink(details)
            .then(data => {
                setCustomDrink(data)
            console.log(customDrink)
            })


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
            .then(data => {setCount(data.length)
                console.log(data.length)})
    }


    return(
        <div className={"detailPage"}>
            <div>
                {customDrink && source === "db" && <div>


                    <div className={"heading_details"} >{customDrink.customDrinkName}</div>
                    <img className={"detailDrinkPhoto"} src={customDrink?.customDrinkURL} alt="cocktail"/>
                    <div className={"heading_details"}>Instructions:</div>
                    <div>
                        {customDrink.customInstruction}
                    </div>
                    <label className={"heading_details"}>Ingredients:</label>

                    <div>{
                        customDrink.customIngredients.map(ingr =><div>
                          <span>  {ingr.customAmount}</span>
                           <span> {ingr.customUnit}</span>
                           <span> {ingr.customIngredientName}</span></div>)

                    }
                    </div>


                    <div className={"heading_details"}>Glass:</div>
                    <div>
                        {customDrink.customGlass}
                    </div>
                    <button type="button" className="btn btn-warning" onClick={() => {
                        handleClick();
                        numberOfFavourites();
                    }}>Add to favourites</button>
                    <div className={"alertSpots"}>{5 - count} spot(s) left for your favs! </div>
                    {error && <div className={"error"}>{error}
                        <br/>
                        <button onClick={()=> nav("/favourites")}>back to favourites</button>
                    </div>}
                </div>}
          </div>
            {detail && source === "public_api" &&
                <div>
                    <div className={"heading_details"}>{detail.drinks[0].strDrink}</div>
                    <div>
                        <img className={"detailDrinkPhoto"} src={detail.drinks[0].strDrinkThumb} alt={""}/>
                    </div>
                    <button type="button" className="btn btn-warning" onClick={() => {
                        handleClick();
                        numberOfFavourites();
                    }}>Add to favourites</button>
                    <div className={"alertSpots"}>{5 - count} spot(s) left for your favs! </div>
                    {error && <div className={"error"}>{error}
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
    )
}