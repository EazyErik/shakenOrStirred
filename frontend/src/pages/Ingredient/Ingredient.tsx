import {useEffect, useState} from "react";
import {getCustomIngredients, getIngredientsFromCocktailApi} from "../../apiServices/service";

import {useNavigate} from "react-router-dom";
import "./Ingredient.css"


export default function Ingredient() {
    const[allIngredientNames,setAllIngredientNames] = useState<string[]>([])
    const nav = useNavigate()

    useEffect(() => {

      getIngredientsFromCocktailApi()
          .then(cocktailIngredients => cocktailIngredients.drinks.map(cocktailIngredient => cocktailIngredient.strIngredient1))
          .then(cocktailIngredientNames => setAllIngredientNames(currentIngredientNames => [...currentIngredientNames,...cocktailIngredientNames]))

    },[])

    useEffect(() => {
        getCustomIngredients()

            .then(customIngredients => customIngredients.map(customIngredients => customIngredients.customIngredientName))

            .then(customIngredientName => {setAllIngredientNames(currentIngredientNames => [...currentIngredientNames,...customIngredientName])

            console.log(customIngredientName)})

    },[])

    const distinct = (value: string, index:number, self: Array<string>) => {
        return self.indexOf(value) === index;
    }

    return(
        <div className={"ingredientsTable"}>
        <div className="d-grid gap-2">
            {allIngredientNames &&
            allIngredientNames.filter(distinct).map(name =><button type="button" className={"btn btn-secondary"} onClick={() => nav(`/ingredient=${name}`)}>{name}</button>)}<br/>

        </div>
        </div>

    )
}