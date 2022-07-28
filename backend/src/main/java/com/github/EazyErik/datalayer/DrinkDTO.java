package com.github.EazyErik.datalayer;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.lang.reflect.Method;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DrinkDTO {

    String idDrink;
    String strDrinkThumb;
    String strDrink;
    String strInstructions;
    String strGlass;
    String strIngredient1;
    String strIngredient2;
    String strIngredient3;
    String strIngredient4;
    String strIngredient5;
    String strIngredient6;
    String strIngredient7;
    String strMeasure1;
    String strMeasure2;
    String strMeasure3;
    String strMeasure4;
    String strMeasure5;
    String strMeasure6;
    String strMeasure7;

    public static DrinkDTO of(CustomDrink customDrink) {
        DrinkDTO drinkDTO = new DrinkDTO();
        drinkDTO.setIdDrink(customDrink.getCustomIDFromDB());
        drinkDTO.setStrDrinkThumb(customDrink.getCustomDrinkURL());
        drinkDTO.setStrDrink(customDrink.getCustomDrinkName());
        drinkDTO.setStrInstructions(customDrink.getCustomInstruction());
        drinkDTO.setStrGlass(customDrink.getCustomGlass());

        List<CustomIngredient> ingredients = customDrink.getCustomIngredients();
        Class<DrinkDTO> drinkDTOClass = DrinkDTO.class;
        try {
            for (int i = 0; i < 7 && i < ingredients.size(); i++) {
                Method setter = drinkDTOClass.getMethod("setStrIngredient" + (i + 1), String.class);
                setter.invoke(drinkDTO, ingredients.get(i).getCustomIngredientName());

                setter = drinkDTOClass.getMethod("setStrMeasure" + (i + 1), String.class);
                setter.invoke(drinkDTO, ingredients.get(i).getCustomAmount() + " " + ingredients.get(i).getCustomUnit());

            }

        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }

        return drinkDTO;


    }




}
