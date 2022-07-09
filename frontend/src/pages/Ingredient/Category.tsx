import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {CategoryModel} from "../../components/Model";
import {getCategory} from "../../apiServices/service";

interface Params {
    drinkCategory:string
}


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
            category.drinks.map(cat => <div onClick={() => nav(`/details=${cat.idDrink}`)}>
               <div>
                   <img src={cat.strDrinkThumb} />

               </div>
                <div>
                    {cat.strDrink}
                </div>
            </div>)}
        </div>

    )
}