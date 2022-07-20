import {useEffect, useState} from "react";
import showMyFavourites, {deleteFromFavourites, getDrink} from "../../apiServices/service";
import {Cocktail} from "../../components/Model";
import {useNavigate} from "react-router-dom";
import "./Favourite.css"




export default function Favourite() {

    const [favourites, setFavourites] = useState<Cocktail[]>([])


    const nav = useNavigate()


    useEffect(() => {
        getFavourites()

    }, [])

    const getFavourites = () => {
        const arr: Cocktail[] = []

        showMyFavourites()
            .then(data => {
                console.log(data)
                setFavourites([])
                data.map(fav => fav.idDrink)
                    .map(async id => {
                        arr.push((await getDrink(id)).drinks[0])
                        setFavourites([...arr])

                    })

            })
            .catch((error) => {
                if (error.response.status === 403) {
                    localStorage.removeItem("jwt")
                    nav("/")
                }
            })

    }


    const deleteDrink = (id: string) => {

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

            </div>
            <div>
                <button type="button" className="btn btn-secondary" onClick={() => nav(-3)}>back to ingredients</button>
            </div>
        </div>
    )
}