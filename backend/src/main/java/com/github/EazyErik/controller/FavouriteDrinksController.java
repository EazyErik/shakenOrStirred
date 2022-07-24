package com.github.EazyErik.controller;


import com.github.EazyErik.datalayer.FavouriteDrink;
import com.github.EazyErik.service.DrinksService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;


@RestController("FavouriteDrinksController")
@RequestMapping("api/favourites")
@RequiredArgsConstructor
@CrossOrigin
public class FavouriteDrinksController {


    private final DrinksService drinksService;

    @PostMapping
    public ResponseEntity<FavouriteDrink> addToFavorite(@RequestBody FavouriteDrink idDrink, Principal username) {
        try{
            return ResponseEntity.ok(drinksService.addToFavorite(idDrink,username.getName()));
        }catch(IllegalStateException e){
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping
    public List<FavouriteDrink> getAllMyFavourites(Principal username) {
        return drinksService.getAllMyFavourites(username.getName());
    }

    @DeleteMapping("/{id}")
    public void deleteDrinkFromFavourites(@PathVariable String id) {
        drinksService.removeFromFavs(id);
    }

}
