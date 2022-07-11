

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
        strDrink:string
        strDrinkThumb:string
        idDrink:string
    }]
}

export interface DetailModel{
    drinks:[{
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
    }]


}
export interface LoginResponse{
    token:string

}
