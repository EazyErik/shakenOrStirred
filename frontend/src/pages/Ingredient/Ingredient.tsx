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
        <div className={"ingredients"}>
            {ingredient &&
            ingredient.drinks.map((ingr,index) => <div className={"singleIngredient"} key={index} onClick={() => nav(`/ingredient=${ingr.strIngredient1}`)}>{ingr.strIngredient1}</div>)}<br/>

        </div>
        </div>

    )
}