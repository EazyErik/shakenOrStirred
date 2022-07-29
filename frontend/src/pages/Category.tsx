import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {CocktailModel} from "../components/Model";
import {getCategory, getAllCustomDrinks} from "../apiServices/service";
import "./Category.css"
import CocktailList from "../components/CocktailList";


export default function Category() {
    const {drinkCategory} = useParams()
    const [category, setCategory] = useState<CocktailModel[]>()
    const [customDrink, setCustomDrink] = useState<CocktailModel[]>([])



    useEffect(() => {
        getCategory(drinkCategory)
            .then(data => {
                setCategory(data)
                console.log(data)
            })
        getAllCustomDrinks(drinkCategory)
            .then(currentCocktail => setCustomDrink(currentCocktail))
        console.log(drinkCategory)

    }, [drinkCategory])

console.log(category)
    return (
        <div className={"table"}>
            <label className={"category"}> {drinkCategory} Drinks:</label>
            {customDrink && <CocktailList drinks={customDrink} sourceDrink={"db"} />}
            {category && <CocktailList drinks={category} sourceDrink={"public_api"} />}
        </div>

    )
}