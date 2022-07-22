import axios, {AxiosResponse} from "axios";
import {CategoryModel, CustomDrinkModel, DetailModel, FavouriteDrinkModel, IngredientModel, LoginResponseModel}
    from "../components/Model";


// communication with cocktail api
export function getIngredientsFromCocktailApi() {
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
        .then((response:AxiosResponse<DetailModel>) =>{
            return response.data

        })
}
// communication with database(collection: favouriteDrink)

export function deleteFromFavourites(id:string | undefined){
    return axios.delete(`api/favourites/${id}`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
            }

        })


}

export function postToFavourites(id:string | undefined) {


    return axios.post(`api/favourites`,{idDrink:id},
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
     }

     }

    )

}

export function showMyFavourites() {
    return axios.get(`/api/favourites`,{
        headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`
        }

    })
        .then((response:AxiosResponse<FavouriteDrinkModel[]>) => response.data)
}

//communication with database(Collection:customDrink)

export function postCustomDrink(customDrink:CustomDrinkModel) {
    return axios.post(`api/customDrink`,customDrink,{
        headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`
        }
    }
    )
}


export function getCustomIngredients () {
    return axios(`/api/customDrink`,{
        headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`
        }
    })
        .then((response:AxiosResponse<CustomDrinkModel[]>) =>response.data)
        .then(customDrinks => customDrinks.flatMap(customDrink => customDrink.customIngredients))
}

export function getAllCustomDrinks(ingredient:string | undefined) {
    return axios(`/api/customDrink?ingredient=${ingredient}`,{
        headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`
        }
    })
        .then((response:AxiosResponse<CustomDrinkModel[]>) =>response.data)

}

export function getCustomDrink(details:string | undefined) {
    return axios(`api/customDrink/details?id=${details}`,{
        headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`
        }
    })
        .then((response:AxiosResponse<CustomDrinkModel>) => response.data)
}



//communication with cloudinary

export function sendPicture(formData:FormData) {
    return axios.post(`https://api.cloudinary.com/v1_1/eazyerik/image/upload`,formData)
        .then(response => response.data)
}



//registration and login
export function createUser(username:string, password:string, passwordAgain:string) {
    return axios.post("api/user",{username:username,password:password,passwordAgain:passwordAgain})
}

export function loginNow(username:string, password:string) {
    return axios.post("/api/login",{username:username, password:password})
        .then((response:AxiosResponse<LoginResponseModel>) => response.data)
}