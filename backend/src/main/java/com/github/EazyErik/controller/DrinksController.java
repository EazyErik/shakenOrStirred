package com.github.EazyErik.controller;


import com.github.EazyErik.datalayer.Drink;
import com.github.EazyErik.service.DrinksService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController("DrinksController")
@RequestMapping("api/addToFav")
@RequiredArgsConstructor
@CrossOrigin
public class DrinksController {


    private final DrinksService drinksService;

    @PostMapping
    public Drink addToFavorite(@RequestBody Drink idDrink, Principal username) {
        return drinksService.addToFavorite(idDrink,username.getName());

    }

    @GetMapping
    public List<Drink> getAllMyFavourites(Principal username) {
        return drinksService.getAllMyFavourites(username.getName());
    }

}
