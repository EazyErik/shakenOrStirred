package com.github.EazyErik.controller;


import com.github.EazyErik.datalayer.CustomDrink;
import com.github.EazyErik.service.CustomDrinksService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

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
    public List<CustomDrink> getCustomDrinks( @RequestParam(required = false) String ingredient) {
        return customDrinksService.getCustomDrinks(ingredient);
    }

    @GetMapping("/details")
    public CustomDrink getCustomDrink(@RequestParam String id) {
        return customDrinksService.getCustomDrink(id);
    }



}
