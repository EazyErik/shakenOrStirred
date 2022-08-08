import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {
    getCustomDrink,
    getDrink,
    showMyFavourites
} from "../apiServices/service";
import {CocktailModel} from "../components/Model";
import "./Details.css"
import DetailsCard from "../components/DetailsCard";


export default function Details() {
    const {details,source} = useParams()
    const[detail,setDetail] = useState<CocktailModel>()
    const[spotsLeft,setSpotsLeft] = useState(5)
    const maxNumberOfEmptySpots = 5;
    const numberOfFavourites = () => {

        showMyFavourites()
            .then(data => {
                setSpotsLeft(maxNumberOfEmptySpots - data.length)
                console.log(data.length)

            })
    }

    useEffect(() => {
        numberOfFavourites()
        if(source === "public_api"){
            getDrink(details)
                .then(data => setDetail(data)
               )
        }
        else{
            getCustomDrink(details)
                .then(data => {
                    setDetail(data)
                })
        }

    },[details,source])


    return(
        <div className={"detailPage"}>
            {source && detail &&
            <DetailsCard drinkDetails={detail} source={source} spotsLeft={spotsLeft} checkLength={numberOfFavourites} />}

        </div>
    )
}