import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {CategoryModel} from "../../components/Model";
import {getCategory} from "../../apiServices/service";



export default function Category() {
    const {drinkCategory} = useParams()
    const[category,setCategory] = useState<CategoryModel>()
    const nav = useNavigate()


    useEffect(() => {
        getCategory(drinkCategory)
            .then(data => setCategory(data))


    },[])

    return(
        <div>
            {category &&
            category.drinks.map(singleCategory => <div onClick={() => nav(`/details=${singleCategory.idDrink}`)}>
               <div>
                   <img src={singleCategory.strDrinkThumb} alt={"drinkCategory"} />

               </div>
                <div>
                    {singleCategory.strDrink}
                </div>
            </div>)}
        </div>

    )
}