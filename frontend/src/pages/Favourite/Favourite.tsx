import {useEffect, useState} from "react";
import showMyFavourites, { getDrink} from "../../apiServices/service";
import {Cocktail} from "../../components/Model";

import {useNavigate} from "react-router-dom";
import "./Favourite.css"




export default function Favourite() {

    const[favourites, setFavourites] = useState<Cocktail[]>([])





    const nav = useNavigate()


    useEffect(() => {
        const arr: Cocktail[] = []
        showMyFavourites()
            .then(data => {
                data.map(fav => fav.idDrink)
                    .map(async id => {
                        arr.push((await getDrink(id)).drinks[0])
                        setFavourites([...arr])

                    })

            })


    },[])

    const handleClick = () => {
        nav(-3)

    }








    return(
        <div>
        <div className={"FavouritesList"}>
            <p className={"title"}>here are your favourites:</p>
            {favourites.map(drink => <div>{drink.strDrink}</div>)}



        </div>
            <div>
            <button onClick={ handleClick}>back to ingredients</button>
            </div>
        </div>
    )





}