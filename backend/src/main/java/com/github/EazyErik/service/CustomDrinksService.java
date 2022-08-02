package com.github.EazyErik.service;


import com.github.EazyErik.datalayer.CustomDrink;
import com.github.EazyErik.repository.CustomDrinksRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CustomDrinksService {

    private final CustomDrinksRepository customDrinksRepository;


    public CustomDrink addCustomDrink(CustomDrink customDrink, String username) {
        if (customDrink.getCustomDrinkName() == null || customDrink.getCustomDrinkName().isBlank()
                || customDrink.getCustomInstruction() == null || customDrink.getCustomInstruction().isBlank()
                || customDrink.getCustomDrinkURL() == null || customDrink.getCustomDrinkURL().isBlank()
                || customDrink.getCustomIngredients().get(0).getCustomIngredientName() == null || customDrink.getCustomIngredients().get(0).getCustomIngredientName().isBlank()
                || customDrink.getCustomGlass() == null || customDrink.getCustomGlass().isBlank()
        ) {
            throw new IllegalArgumentException();
        }
        customDrink.setUsername(username);
        return customDrinksRepository.save(customDrink);
    }

    public List<CustomDrink> getCustomDrinks(String ingredient) {
        if(ingredient == null) {
           return customDrinksRepository.findAll();
        }else{
            return customDrinksRepository.findAll().stream()
                    .filter((customDrink) -> hasIngredient(customDrink,ingredient))
                    .toList();
        }


    }
    private boolean hasIngredient(CustomDrink customDrink,String ingredient ) {
        return customDrink.getCustomIngredients().stream()
                .anyMatch(customIngredient -> customIngredient.getCustomIngredientName().equals(ingredient));
    }

    public CustomDrink getCustomDrink(String id) {
        return customDrinksRepository.findCustomDrinkByCustomIDFromDB(id);
    }

    public List<String> getAllIngredients() {
        List<CustomDrink> allDrinks = customDrinksRepository.findAll();
        List<String> ingredientNames = new ArrayList<>();


        for(CustomDrink drink : allDrinks) {
         ingredientNames.addAll(drink.getCustomIngredients().stream()
                  .map(ing -> ing.getCustomIngredientName()).toList());
        }
        return ingredientNames.stream().distinct().toList();

    }
    public List<CustomDrink> getDrinksByName(String drinkName) {

            return customDrinksRepository.findAll().stream()
                    .filter((customDrink) -> hasDrinkName(customDrink,drinkName))
                    .toList();

    }
    private boolean hasDrinkName(CustomDrink customDrink,String drinkname ) {
//

        return customDrink.getCustomDrinkName().contains(drinkname);
    }

    private boolean isAlcoholic(CustomDrink customDrink,String alcoholic) {
        return customDrink.getCustomAlcoholic().equals(alcoholic);
    }

    public List<CustomDrink> getDrinksByAlcoholic(String alcoholic) {

        return customDrinksRepository.findAll().stream()
                .filter((customDrink) -> isAlcoholic(customDrink,alcoholic))
                .toList();

    }

    public List<CustomDrink> getDrinksByIngredient(String ingredient) {
        return customDrinksRepository.findAll().stream()
                .filter((customDrink) -> hasIngredient(customDrink,ingredient))
                .toList();

    }
}
