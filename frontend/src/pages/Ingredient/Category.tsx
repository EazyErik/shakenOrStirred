import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {CategoryModel} from "../../components/Model";
import {getCategory} from "../../apiServices/service";
import "./Category.css"



export default function Category() {
    const {drinkCategory} = useParams()
    const[category,setCategory] = useState<CategoryModel>()
    const nav = useNavigate()


    useEffect(() => {
        getCategory(drinkCategory)
            .then(data => setCategory(data))


    },[drinkCategory])

    return(
        <div className={"table"}>
            {category &&
            category.drinks.map((singleCategory,index) => <div key={index} onClick={() => nav(`/details=${singleCategory.idDrink}`)}>
               <div className={"drinkName"}>
                   {singleCategory.strDrink}


               </div>
                <div >
                    <img className={"photoDrink"} src={singleCategory.strDrinkThumb} alt={"drinkCategory"} />

                </div>
            </div>)}
        </div>

    )
}