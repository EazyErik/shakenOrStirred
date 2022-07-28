import CocktailCard from "./CocktailCard/CocktailCard";
import {CocktailModel} from "./Model";
import {useNavigate} from "react-router-dom";

export interface CocktailListProps {
    drinks:CocktailModel[]
    sourceDrink:string

}



export default function CocktailList({drinks,sourceDrink} : CocktailListProps) {

    const nav = useNavigate()

    return (
        <div>

            {
                drinks.map((currentDrink, index) =>
                    <div key={index} onClick={() => nav(`/details=${currentDrink.idDrink}&source=${sourceDrink}`)}>

                        <CocktailCard
                            cocktailName={currentDrink.strDrink}
                            cocktailPicture={currentDrink.strDrinkThumb
                            }/>
                    </div>)
            }

        </div>
    )
}