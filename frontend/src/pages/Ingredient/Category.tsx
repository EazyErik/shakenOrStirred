import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {CategoryModel, CustomDrinkModel} from "../../components/Model";
import {getCategory, getAllCustomDrinks} from "../../apiServices/service";
import "./Category.css"

import CocktailCard from "../../components/CocktailCard";


export default function Category() {
    const {drinkCategory} = useParams()
    const [category, setCategory] = useState<CategoryModel>()
    const [customDrink, setCustomDrink] = useState<CustomDrinkModel[]>([])
    const nav = useNavigate()


    useEffect(() => {
        getCategory(drinkCategory)
            .then(data => {
                setCategory(data)
                console.log(data)
            })
        getAllCustomDrinks(drinkCategory)
            .then(currentCocktail => setCustomDrink(currentCocktail))
        console.log(drinkCategory)
// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <div className={"table"}>
            <label className={"category"}> {drinkCategory} Drinks:</label>
            {customDrink &&
                customDrink
                    .map((currentDrink, index)=>
                       <div key={index} onClick={() => nav(`/details=${currentDrink.customIDFromDB}&source=db`)}>
                            <CocktailCard cocktailName={currentDrink.customDrinkName}
                                                      cocktailPicture={currentDrink.customDrinkURL} />
                       </div> )}



            {category &&
            category.drinks.map((singleCategory,index) =>
                <div  key={index} onClick={() => nav(`/details=${singleCategory.idDrink}&source=public_api`)}>
               <CocktailCard cocktailName={singleCategory.strDrink} cocktailPicture={singleCategory.strDrinkThumb} />


            </div>)}
        </div>

    )
}