import axios, {AxiosResponse} from "axios";
import {CategoryModel,DetailModel, IngredientModel, LoginResponse} from "../components/Model";

export function getIngredients() {
    return axios.get<IngredientModel>("https://thecocktaildb.com/api/json/v1/1/list.php?i=list"

    )
        .then((response:AxiosResponse<IngredientModel> )=> response.data)
}

export function getCategory(drinkCategory: string | undefined) {
    return axios.get(`https://thecocktaildb.com/api/json/v1/1/filter.php?i=${drinkCategory}`

    )
        .then((response:AxiosResponse<CategoryModel>) => response.data)

}
export function getDrink(details:string | undefined) {
    return axios.get(`https://thecocktaildb.com/api/json/v1/1/lookup.php?i=${details}`)
        .then((response:AxiosResponse<DetailModel>) => response.data)
}

export function postToFavourites(details: string | undefined) {
    return axios.post("api/addToFav",
        //todo
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
            }
        })

}

export function createUser(username:string, password:string, passwordAgain:string) {
    return axios.post("api/user",{username:username,password:password,passwordAgain:passwordAgain})
}

export function loginNow(username:string, password:string) {
    return axios.post("/api/login",{username:username, password:password})
        .then((response:AxiosResponse<LoginResponse>) => response.data)
}