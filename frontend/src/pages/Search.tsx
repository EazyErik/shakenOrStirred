import {useEffect, useState} from "react";
import {
    searchInDB,
    searchInPublicAPI,
    searchWithAlcoholicInDB,
    searchWithAlcoholicInPublicAPI, searchWithIngrNameInDB, searchWithIngrNameInPublicAPI
} from "../apiServices/service";
import {CocktailModel} from "../components/Model";
import "./Search.css"
import {useNavigate} from "react-router-dom";

export interface SearchProps{
    source:string

}


export default function Search() {

    const [drinkName, setDrinkName] = useState("")
    const [drinks, setDrinks] = useState<CocktailModel[]>([])
    const[drinksDB, setDrinksDB] = useState<CocktailModel[]>([])
    const[radioButtonValue,setRadioButtonValue] = useState("Alcoholic")
    const[ingredient,setIngredient] = useState("")

    const nav = useNavigate()

useEffect (()=> {

    console.log(drinks)

},[drinks])




    const searchWithDrinkName = () => {
        searchInPublicAPI(drinkName)
            .then(data =>
                data &&
                setDrinks([...drinks,...data]))
        searchInDB(drinkName)
            .then(data =>
                data &&
                setDrinksDB([...drinksDB,...data]))
    }

    const searchWithIngredientName = async () => {
        let temp: CocktailModel[] = []
        await searchWithIngrNameInPublicAPI(ingredient)
            .then(data => {
                if (data) temp = [...temp, ...data]
            })
        let tempDB: CocktailModel[] = []
        await searchWithIngrNameInDB(ingredient)
            .then(data => {
                if (data) tempDB = [...tempDB, ...data]
            })
        setDrinks(temp)
        setDrinksDB(tempDB)

    }

    const searchWithAlc = () => {
        searchWithAlcoholicInPublicAPI(radioButtonValue)
            .then(data => data && setDrinks([...drinks,...data]))

        searchWithAlcoholicInDB(radioButtonValue)
            .then(data => setDrinksDB([...drinksDB,...data]))
    }
    const renderFilter = () => {
        return <div className={"searchBars"}>
            <div>
               <div> <label >Enter the name of your drink:</label></div>
               <div> <input type={"text"} placeholder={"drink name"} value={drinkName}
                       onChange={event => setDrinkName(event.target.value)}/></div>
               <div className={"buttonSearch"}><button onClick={searchWithDrinkName}>Search</button></div>
            </div>

            <div>
               <div> <label >Enter your ingredient:</label></div>
               <div> <input type={"text"} placeholder={"ingredient name"} value={ingredient}
                       onChange={event => setIngredient(event.target.value)}/></div>
               <div className={"buttonSearch"}> <button onClick={searchWithIngredientName}>Search</button></div>

            </div>
            <div>
                <label >Alcoholic:</label>
                <input className={"radioButton"} onChange={() => setRadioButtonValue("Alcoholic")}
                       checked={radioButtonValue === "Alcoholic"} type={"radio"}/>
                <label>Non Alcoholic:</label>
                <input className={"radioButton"} onChange={() => setRadioButtonValue("Non_Alcoholic")}
                       checked={radioButtonValue === "Non_Alcoholic"} type={"radio"}/>
                <div><button onClick={searchWithAlc}>Search</button></div>
            </div>
        </div>
    }



    const renderResult = () => {
        return <div>
            <div className="d-grid gap-2">
                {drinks && drinks.map(drink =>
                <button onClick={() => nav(`/details=${drink.idDrink}&source=public_api`)}
                    className={"btn btn-secondary"}>{drink.strDrink}
                </button>)}
                {drinksDB && drinksDB.map(drink =>
                    <button onClick={() => nav(`/details=${drink.idDrink}&source=db`)}
                            className={"btn btn-secondary"}>{drink.strDrink}
                    </button>)}
            </div>
            <button onClick={() => {setDrinks([])
            setDrinksDB([])}}>back</button>
        </div>
    }


    return (

        <div>
            <div>
                {drinks && drinks.length === 0 &&
                    drinksDB && drinksDB.length === 0 ? renderFilter() : renderResult()}

            </div>


        </div>



    )
}