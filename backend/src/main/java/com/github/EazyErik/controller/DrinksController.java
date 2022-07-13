package com.github.EazyErik.controller;


import com.github.EazyErik.datalayer.Drink;
import com.github.EazyErik.service.DrinksService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController("DrinksController")
@RequestMapping("api/addToFav")
@RequiredArgsConstructor
@CrossOrigin
public class DrinksController {


    private final DrinksService drinksService;

    @PostMapping
    public Drink addToFavorite(@RequestBody Drink idDrink) {
        return drinksService.addToFavorite(idDrink);

    }

}
