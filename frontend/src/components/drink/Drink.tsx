import {Cocktail} from "../Model";
import "./Drink.css"

interface DrinkProps{
    infos:Cocktail
}

export default function Drink(props:DrinkProps) {
    return(
        <div className={"Drink"}>
            <h2>{props.infos.strDrink}</h2>
            <img className={"image"} src={props.infos.strDrinkThumb}/>


        </div>
    )
}