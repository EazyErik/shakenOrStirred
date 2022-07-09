import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getDrink} from "../../apiServices/service";
import {DetailModel} from "../../components/Model";


export default function Details() {
    const {details} = useParams()
    const[detail,setDetail] = useState<DetailModel>()

    useEffect(() => {
        getDrink(details)
            .then(data => setDetail(data))

    })

    return(
        <div>

        </div>
    )
}