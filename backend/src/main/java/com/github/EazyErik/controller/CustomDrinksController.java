package com.github.EazyErik.controller;


import com.github.EazyErik.datalayer.CustomDrink;
import com.github.EazyErik.datalayer.DrinkDTO;
import com.github.EazyErik.service.CustomDrinksService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/customDrink")
@RequiredArgsConstructor
public class CustomDrinksController {

    private final CustomDrinksService customDrinksService;



    @PostMapping()
    public CustomDrink addCustomDrink(@RequestBody CustomDrink customDrink, Principal username) {
        return customDrinksService.addCustomDrink(customDrink,username.getName());

    }
    @GetMapping()
    public List<DrinkDTO> getCustomDrinks(@RequestParam(required = false) String ingredient) {
        return customDrinksService.getCustomDrinks(ingredient).stream()
                .map(drink -> DrinkDTO.of(drink))
                .toList();
    }

    @GetMapping("/details")
    public DrinkDTO getCustomDrink(@RequestParam String id) {
        return DrinkDTO.of(customDrinksService.getCustomDrink(id));
    }

    @GetMapping("/ingredients")
    public List<String> getIngredients()  {
        return customDrinksService.getAllIngredients();

    }

    @GetMapping("/search")
    public List<DrinkDTO> getDrinksByName(@RequestParam String drinkName) {
        return customDrinksService.getDrinksByName(drinkName).stream()
                .map(drink -> DrinkDTO.of(drink))
                .toList();
    }

    @GetMapping("/searchByAlcoholic")
    public List<DrinkDTO>getDrinksByAlcoholic(@RequestParam String alcoholic) {
        return customDrinksService.getDrinksByAlcoholic(alcoholic).stream()
                .map(drink -> DrinkDTO.of(drink))
                .toList();
    }

    @GetMapping("/searchByIngredient")
    public List<DrinkDTO>getDrinksByIngredient(@RequestParam String ingredient) {
        return customDrinksService.getDrinksByIngredient(ingredient).stream()
                .map(drink -> DrinkDTO.of(drink))
                .toList();
    }


      @GetMapping(("/randomCocktail"))
    public ResponseEntity<DrinkDTO> getRandomCocktail(){
          Optional<CustomDrink> selectedDrink = customDrinksService.getRandomCocktail();
          if(selectedDrink.isEmpty()){
              return ResponseEntity.of(Optional.empty());
          }
          return ResponseEntity.of(customDrinksService.getRandomCocktail().map(DrinkDTO::of));
      }
}






