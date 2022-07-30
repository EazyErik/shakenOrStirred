import {useState} from "react";
import {searchInDB, searchInPublicAPI, searchWithAlcoholicInDB} from "../apiServices/service";
import {CocktailModel} from "../components/Model";
import "./Search.css"


export default function Search() {

    const [drinkName, setDrinkName] = useState("")
    const [drinks, setDrinks] = useState<CocktailModel[]>([])
    const[radioButtonValue,setRadioButtonValue] = useState("Alcoholic")
    const[ingredient,setIngredient] = useState("")

    const searchWithDrinkName = () => {
        searchInPublicAPI(drinkName)
            .then(data => setDrinks(data))
        searchInDB(drinkName)
            .then(data => setDrinks([...drinks,...data]))
    }

    const searchWithIngredientName = () => {

    }

    const searchWithAlc = () => {
        searchWithAlcoholicInDB(radioButtonValue)
            .then(data => console.log(data))
    }
    const renderFilter = () => {
        return <div>
            <div>
                <label>Enter the name of your drink:</label>
                <input type={"text"} placeholder={"drink name"} value={drinkName}
                       onChange={event => setDrinkName(event.target.value)}/>
                <button onClick={searchWithDrinkName}>Search</button>
            </div>
            <div>
                <label>Alcoholic:</label>
                <input className={"radioButton"} onChange={() => setRadioButtonValue("Alcoholic")}
                       checked={radioButtonValue === "Alcoholic"} type={"radio"}/>
                <label>Non Alcoholic:</label>
                <input className={"radioButton"} onChange={() => setRadioButtonValue("Non_Alcoholic")}
                       checked={radioButtonValue === "Non_Alcoholic"} type={"radio"}/>
                <button onClick={searchWithAlc}>go</button>
            </div>
            <div>
                <label>Enter your ingredient:</label>
                <input type={"text"} placeholder={"ingredient name"} value={ingredient}
                       onChange={event => setIngredient(event.target.value)}/>
                <button onClick={searchWithIngredientName}>Search</button>

            </div>
        </div>
    }

    const renderResultat = () => {
        return <div>
            <div className={"searchResults"}> {drinks && drinks.map(drink => <div
                className={"searchDrink"}>{drink.strDrink}</div>)}</div>
            <button onClick={() => setDrinks([])}>back</button>
        </div>
    }


    return (

        <div>
            <div>
                {drinks.length === 0 && renderFilter()}
                {drinks.length > 0 &&
                renderResultat()}

            </div>

        </div>



    )
}