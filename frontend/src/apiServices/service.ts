import axios, {AxiosResponse} from "axios";
import {CategoryModel, Cocktail, DetailModel, IngredientModel} from "../components/Model";

export function getGinDrinks() {
    return axios.get("https://thecocktaildb.com/api/json/v1/1/filter.php?i=Vodka")
        .then((response:AxiosResponse<Cocktail[]> )=> response.data)

}
export function getIngredients() {
    return axios.get<IngredientModel>("https://thecocktaildb.com/api/json/v1/1/list.php?i=list")
        .then((response:AxiosResponse<IngredientModel> )=> response.data)
}

export function getCategory(drinkCategory: string | undefined) {
    return axios.get(`https://thecocktaildb.com/api/json/v1/1/filter.php?i=${drinkCategory}`)
        .then((response:AxiosResponse<CategoryModel>) => response.data)

}
export function getDrink(details:string | undefined) {
    return axios.get(`https://thecocktaildb.com/api/json/v1/1/lookup.php?i=${details}`)
        .then((response:AxiosResponse<DetailModel>) => response.data)
}

export function postToFavourites(details: string | undefined) {
    return axios.post(`api/addToFav`)

}

export function createUser(username:string, password:string, passwordAgain:string) {
    return axios.post(`api/user`,{username:username,password:password,passwordAgain:passwordAgain})
}