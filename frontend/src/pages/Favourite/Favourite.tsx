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
                data.map(fav=> fav.idDrink)
                    .map(async id => {
                        arr.push((await getDrink(id)).drinks[0])
                        setFavourites([...arr])

                    })

            })


    },[])



    const deleteDrink = () => {

    }

    return(
        <div>
        <div className={"FavouritesList"}>
            <label className={"title"}>Here are your favourites:</label>
            {favourites.map(drink =>
                <div className={"favName"}>
                    {drink.strDrink}
                   <div> <img className={"favPic"} src={drink.strDrinkThumb} alt={"picture of cocktail"}></img></div>
                    <button onClick={deleteDrink} type="button" className="btn btn-danger">delete this drink</button>

                </div>
            )
            }

        </div>
            <div>
            <button type="button" className="btn btn-secondary" onClick={() => nav(-3)}>back to ingredients</button>
            </div>
        </div>
    )





}