import axios from "axios";
import {IngredientModel} from "../components/Model";

export function getGinDrinks() {
    return axios.get("https://thecocktaildb.com/api/json/v1/1/filter.php?i=Vodka")
        .then(response => response.data)

}
export function getIngredients() {
    return axios.get<IngredientModel>("https://thecocktaildb.com/api/json/v1/1/list.php?i=list")
        .then(response => response.data)
}

export function getCategory(drinkCategory: string | undefined) {
    return axios.get(`https://thecocktaildb.com/api/json/v1/1/filter.php?i=${drinkCategory}`)
        .then(response => response.data)

}
export function getDrink(details:string | undefined) {
    return axios.get(`https://thecocktaildb.com/api/json/v1/1/lookup.php?i=${details}`)
        .then(response => response.data)
}