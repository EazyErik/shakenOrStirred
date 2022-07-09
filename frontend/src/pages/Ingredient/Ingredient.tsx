import {useEffect, useState} from "react";
import {getIngredients} from "../../apiServices/service";
import {IngredientModel} from "../../components/Model";
import {useNavigate} from "react-router-dom";

export default function Ingredient() {
    const[ingredient,setIngredient] = useState<IngredientModel>()
    const nav = useNavigate()

    useEffect(() => {
      getIngredients()
          .then(response => setIngredient(response)
          )

    },[])

    return(
        <div>
            {ingredient &&
            ingredient.drinks.map(ingr => <button onClick={() => nav(`/ingredient=${ingr.strIngredient1}`)}>{ingr.strIngredient1}</button>)}

        </div>
    )
}