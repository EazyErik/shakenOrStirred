import axios, {AxiosResponse} from "axios";
import {

    CocktailModel,
    CustomDrinkModel,
    FavouriteDrinkModel,
    IngredientModel,
    LoginResponseModel
}
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
        .then((response) => response.data.drinks)

}
export function getDrink(details:string | undefined) {
    return axios.get(`https://thecocktaildb.com/api/json/v1/1/lookup.php?i=${details}`)
        .then((response) =>{
            return response.data.drinks[0]

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

export function postToFavourites(id:string | undefined, source:string |undefined) {
    console.log(source)


    return axios.post(`api/favourites`,{idDrink:id,source:source},

        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
     }

     }
    )}

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
    return axios.get(`/api/customDrink/ingredients`,{
        headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`
        }
    })
        .then((response:AxiosResponse<string[]>) =>response.data)

}

export function getAllCustomDrinks(ingredient:string | undefined) {
    return axios.get(`/api/customDrink?ingredient=${ingredient}`,{
        headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`
        }
    })
        .then((response:AxiosResponse<CocktailModel[]>) =>response.data)

}

export function getCustomDrink(details:string | undefined) {
    return axios.get(`api/customDrink/details?id=${details}`,{
        headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`
        }
    })
        .then((response:AxiosResponse<CocktailModel>) => response.data)
}



//communication with cloudinary

export function sendPicture(formData:FormData) {
    return axios.post(`https://api.cloudinary.com/v1_1/eazyerik/image/upload`,formData)
        .then(response => response.data)
}



//registration and login
export function createUser(username:string, password:string, passwordAgain:string) {
    return axios.post("/api/user",{username:username,password:password,passwordAgain:passwordAgain})
}

export function loginNow(username:string, password:string) {
    return axios.post("/api/login",{username:username, password:password})
        .then((response:AxiosResponse<LoginResponseModel>) => response.data)
}

// search with drink name

export function searchInPublicAPI(drinkname: string) {
    return axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drinkname}`)
        .then((response) => response.data.drinks)
}

export function searchInDB(drinkname:string) {
    return axios.get(`/api/customDrink/search?drinkName=${drinkname}`,{
        headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`
        }
    })
        .then(response => response.data)
}

//search with alcoholic

export function searchWithAlcoholicInDB(alcoholic:string) {
    return axios.get(`api/customDrink/searchByAlcoholic?alcoholic=${alcoholic}`,{
        headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`
        }
    })
        .then(response => response.data)
}

export function searchWithAlcoholicInPublicAPI(alcoholic:string) {
    return axios.get(`https://thecocktaildb.com/api/json/v1/1/filter.php?a=${alcoholic}`)
        .then(response => response.data.drinks)
}

export function searchWithIngrNameInDB(ingredient:string) {
    return axios.get(`api/customDrink/searchByIngredient?ingredient=${ingredient}`,{
        headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`
        }
    })
        .then(response => response.data)
}

export function searchWithIngrNameInPublicAPI(ingredient:string) {
    return axios.get(`https://thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`)
        .then(response => response.data.drinks)

}

//random Drink form Cocktail API

export function randomDrinkFromPublicAPI(){
    return axios.get("https://thecocktaildb.com/api/json/v1/1/random.php")
        .then(response => response.data.drinks)
}

export function randomDrinkFromDB(){
    return axios.get("api/customDrink/randomCocktail",{
        headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`
        }
    })
        .then(response => response.data)
}


