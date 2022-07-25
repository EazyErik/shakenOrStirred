import "./CocktailCard.css"
interface CocktailCardProps{
    cocktailName:string
    cocktailPicture:string

}

export default function CocktailCard(props:CocktailCardProps) {

    return(
        <div className={"drinksName"}>
            <h3 className={"drinkName"}>{props.cocktailName}</h3>
            <img className={"photoDrink"} src={props.cocktailPicture} alt="cocktail"/>
        </div>
    )

}