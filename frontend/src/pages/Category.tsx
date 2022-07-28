import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {CategoryModel, CocktailModel, CustomDrinkModel} from "../components/Model";
import {getCategory, getAllCustomDrinks} from "../apiServices/service";
import "./Category.css"

import CocktailCard from "../components/CocktailCard/CocktailCard";
import CocktailList from "../components/CocktailList";


export default function Category() {
    const {drinkCategory} = useParams()
    const [category, setCategory] = useState<CategoryModel>()
    const [customDrink, setCustomDrink] = useState<CocktailModel[]>([])
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
            {customDrink && <CocktailList drinks={customDrink} sourceDrink={"db"} />}
            {category && <CocktailList drinks={category.drinks} sourceDrink={"public_api"} />}




            {/*{category &&*/}
            {/*category.drinks.map((singleCategory,index) =>*/}
            {/*    <div  key={index} onClick={() => nav(`/details=${singleCategory.idDrink}&source=public_api`)}>*/}
            {/*   <CocktailCard cocktailName={singleCategory.strDrink} cocktailPicture={singleCategory.strDrinkThumb} />*/}


            {/*</div>)}*/}
        </div>

    )
}