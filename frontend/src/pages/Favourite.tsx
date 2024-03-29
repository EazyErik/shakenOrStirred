import {useEffect, useState} from "react";
import {deleteFromFavourites, getCustomDrink, getDrink, showMyFavourites} from "../apiServices/service";
import {CocktailModel} from "../components/Model";
import {useNavigate} from "react-router-dom";
import "./Favourite.css"




export default function Favourite() {

    const [favourites, setFavourites] = useState<CocktailModel[]>([])
    const [customFavourites, setCustomFavourites] = useState<CocktailModel[]>([])


    const nav = useNavigate()


    useEffect(() => {
        getFavourites()
// eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const getFavourites = () => {
        const arr: CocktailModel[] = []
        const customArr:CocktailModel[] = []

        showMyFavourites()
            .then(data => {
                console.log(data)
                setFavourites([])
                setCustomFavourites([])
                 data.map(async fav => {
                     if(fav.source === "public_api"){
                         arr.push((await getDrink(fav.idDrink)))
                         setFavourites([...arr])
                     }else if(fav.source === "db"){
                         customArr.push((await getCustomDrink(fav.idDrink) ))
                         setCustomFavourites([...customArr])

                     }


                    })

            })
            .catch((error) => {
                if (error.response.status === 403) {
                    localStorage.removeItem("jwt")
                    nav("/")
                }
            })

    }


    const deleteDrink = (id: string | undefined) => {

        deleteFromFavourites(id)
            .then(() => getFavourites())
            .catch((error) => {
                if (error.response.status === 403) {
                    localStorage.removeItem("jwt")
                    nav("/")
                }
            })

    }

    return (
        <div>
            <div className={"FavouritesList"}>
                <label className={"title"}>Here are your 5 favourites:</label>
                {favourites.map(drink =>
                    <div key={drink.idDrink} className={"favName"}>
                        {drink.strDrink}
                        <div><img className={"favPic"} src={drink.strDrinkThumb} alt={"cocktail"}></img></div>
                        <button onClick={() => deleteDrink(drink.idDrink)} type="button"
                                className="btn btn-danger">delete this drink
                        </button>
                    </div>
                )
                }
                {customFavourites.map(drink =>
                    <div key={drink.idDrink} className={"favName"}>
                        {drink.strDrink}
                        <div><img className={"favPic"} src={drink.strDrinkThumb} alt={"cocktail"}></img></div>
                        <button onClick={() => deleteDrink(drink.idDrink)} type="button"
                                className="btn btn-danger">delete this drink
                        </button>
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