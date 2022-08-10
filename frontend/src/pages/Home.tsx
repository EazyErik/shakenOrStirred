import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import "./Home.css"
import {randomDrinkFromDB, randomDrinkFromPublicAPI} from "../apiServices/service";
import {CocktailModel} from "../components/Model";


export default function Home() {

    const [randomCocktail, setRandomCocktail] = useState<CocktailModel>()
    const [showPopUp, setShowPopUp] = useState<boolean>(false)

    const nav = useNavigate()

    const fetchData = () => {

    randomDrinkFromPublicAPI()
            .then(data => setRandomCocktail(data[0]))
            .then(() => {
                randomDrinkFromDB()
                    .then(data => {
                        if (Math.random() > 0.5) {
                           setRandomCocktail(data)
                        }
                    })
            })
    }

    useEffect(() => {
        fetchData()

    }, [])

    return (
        <div className="d-grid gap-2 col-6 mx-auto">
            <div className={"loggedInUser"}>{localStorage.getItem("username")} is logged in</div>
            { randomCocktail &&
                <div>
                <label>Ever tried a:</label>
                <div className={"heading"}>{randomCocktail.strDrink}</div>
                <div><img onClick={() => setShowPopUp(true)} className={"homeDrinkPhoto"}
                          src={randomCocktail?.strDrinkThumb} alt=""/></div>
                {showPopUp &&
                    <div className={"popUp-details"}>
                        <div className={"popUp-box"}>

                            <label className={"heading"}>Instructions:</label>
                            <div> {randomCocktail?.strInstructions}</div>
                            <label className={"heading"}>Ingredients:</label>
                            <div><span>{randomCocktail?.strMeasure1}</span> {randomCocktail?.strIngredient1}</div>
                            <div><span>{randomCocktail?.strMeasure2}</span> {randomCocktail?.strIngredient2}</div>
                            <div><span>{randomCocktail?.strMeasure3}</span> {randomCocktail?.strIngredient3}</div>
                            <div><span>{randomCocktail?.strMeasure4}</span> {randomCocktail?.strIngredient4}</div>
                            <div><span>{randomCocktail?.strMeasure5}</span> {randomCocktail?.strIngredient5}</div>
                            <div><span>{randomCocktail?.strMeasure6}</span> {randomCocktail?.strIngredient6}</div>
                            <div><span>{randomCocktail?.strMeasure7}</span> {randomCocktail?.strIngredient7}</div>
                            <label className={"heading"}>Glass:</label>
                            <div>{randomCocktail?.strGlass}</div>
                        </div>
                        <button className={"back-button"} onClick={() => setShowPopUp(false)}>back</button>
                    </div>}

            </div>}
            {!showPopUp &&
                <div>
                    <button type="button" className="btn btn-light" onClick={() => nav("/ingredient")}>show all
                        ingredients
                    </button>
                    <br/>
                    <button type="button" className="btn btn-light" onClick={() => nav("/favourites")}>show my
                        favourites
                    </button>
                    <br/>
                    <button type="button" className="btn btn-light" onClick={() => nav("/customDrink")}>create your own
                        drink
                    </button>
                </div>}

        </div>
    )
}