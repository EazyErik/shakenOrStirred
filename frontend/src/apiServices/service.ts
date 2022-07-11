import axios, {AxiosResponse} from "axios";
import {CategoryModel, Cocktail, DetailModel, IngredientModel, LoginResponse} from "../components/Model";

export function getIngredients() {
    return axios.get<IngredientModel>("https://thecocktaildb.com/api/json/v1/1/list.php?i=list",
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
            }
        })
        .then((response:AxiosResponse<IngredientModel> )=> response.data)
}

export function getCategory(drinkCategory: string | undefined) {
    return axios.get(`https://thecocktaildb.com/api/json/v1/1/filter.php?i=${drinkCategory}`,{
        headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`
        }
    })
        .then((response:AxiosResponse<CategoryModel>) => response.data)

}
export function getDrink(details:string | undefined) {
    return axios.get(`https://thecocktaildb.com/api/json/v1/1/lookup.php?i=${details}`,{
        headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`
        }
    })
        .then((response:AxiosResponse<DetailModel>) => response.data)
}

export function postToFavourites(details: string | undefined) {
    return axios.post("api/addToFav",
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
            }
        })

}

export function createUser(username:string, password:string, passwordAgain:string) {
    return axios.post("api/user",{username:username,password:password,passwordAgain:passwordAgain})
}

export function loginNow(username:string, password:string, passwordAgain:string) {
    return axios.post("/api/login",{username:username, password:password})
        .then((response:AxiosResponse<LoginResponse>) => response.data)
}