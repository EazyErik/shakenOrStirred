package com.github.EazyErik.service;


import com.github.EazyErik.datalayer.CustomDrink;
import com.github.EazyErik.repository.CustomDrinksRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CustomDrinksService {

    private final CustomDrinksRepository customDrinksRepository;


    public CustomDrink addCustomDrink(CustomDrink customDrink, String username ) {
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
}
