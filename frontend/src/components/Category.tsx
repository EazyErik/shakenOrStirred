import {useEffect, useState} from "react";
import axios from "axios";
import {getGinDrinks} from "../apiServices/service";
import {Cocktail} from "./Model";
import Drink from "./Drink";


export default function Category() {

    const [results, setResults] = useState<Cocktail[]>()

    useEffect(() => {
        getGinDrinks()
            .then(data => setResults(data))


    },[])


    return(
        <div>
            {results?.map(result => {
                return <Drink infos={result}  />
            })}
        </div>
    )
}