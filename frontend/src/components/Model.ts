

export interface Cocktail {

    strDrink:string
    strDrinkThumb:string


}

export interface IngredientModel{
   drinks:[{
       strIngredient1:string
   }]
}

export interface CategoryModel{
    drinks:[{
        idDrink:string
        strDrink:string
        strDrinkThumb:string

    }]
}

export interface DetailModel{
    drinks:Cocktail[]


}
export interface Cocktail{
    strDrinkThumb: string
    strDrink: string
    strInstructions: string
    strGlass: string
    strIngredient1: string
    strIngredient2: string
    strIngredient3: string
    strIngredient4: string
    strMeasure1: string
    strMeasure2: string
    strMeasure3: string
}


export interface LoginResponse{
    token:string

}

export interface FavouriteDrink{

        idDrink:string

}
