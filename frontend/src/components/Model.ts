
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
    idDrink:string
    strDrinkThumb: string
    strDrink: string
    strInstructions: string
    strGlass: string
    strIngredient1: string
    strIngredient2: string
    strIngredient3: string
    strIngredient4: string
    strIngredient5: string
    strIngredient6: string
    strIngredient7: string
    strMeasure1: string
    strMeasure2: string
    strMeasure3: string
    strMeasure4: string
    strMeasure5: string
    strMeasure6: string
    strMeasure7: string
}


export interface LoginResponse{
    token:string

}

export interface FavouriteDrinkModel {

    idDrink: string

}

export interface CustomDrinkModel{
    customName:string
    customDrinkUrl:string
    customIngredients:Array<CustomIngredientModel>
    customInstruction:string
    customGlass:string
}

export interface CustomIngredientModel {
    customAmount:string
    customUnit:string
    customIngredientName:string

}

