import {useEffect, useState} from "react";
import {getIngredients} from "../../apiServices/service";
import {IngredientModel} from "../../components/Model";
import {useNavigate} from "react-router-dom";
import "./Ingredient.css"


export default function Ingredient() {
    const[ingredient,setIngredient] = useState<IngredientModel>()
    const nav = useNavigate()

    useEffect(() => {
      getIngredients()
          .then(response => setIngredient(response)
          )

    },[])

    return(
        <div className={"ingredientsTable"}>
        <div className="d-grid gap-2">
            {ingredient &&
            ingredient.drinks.map((ingr,index) => <button type="button" className={"btn btn-secondary"} key={index} onClick={() => nav(`/ingredient=${ingr.strIngredient1}`)}>{ingr.strIngredient1}</button>)}<br/>

        </div>
        </div>

    )
}