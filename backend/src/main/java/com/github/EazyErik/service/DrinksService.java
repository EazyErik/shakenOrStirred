package com.github.EazyErik.service;


import com.github.EazyErik.datalayer.FavouriteDrink;
import com.github.EazyErik.repository.FavouriteDrinksRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;



import java.util.List;


@Service
@RequiredArgsConstructor
public class DrinksService {

    private final FavouriteDrinksRepository favouriteDrinksRepository;


    public FavouriteDrink addToFavorite(FavouriteDrink drinkToAdd, String username) {


        int cocktailCounter = favouriteDrinksRepository.countAllByUsername(username);
        if (cocktailCounter >= 5) {
            throw new IllegalStateException("too many drinks in your list");
        }
        drinkToAdd.setUsername(username);
        return favouriteDrinksRepository.save(drinkToAdd);
    }

    public List<FavouriteDrink> getAllMyFavourites(String username) {

      return favouriteDrinksRepository.findAllByUsername(username);



        }

    public void removeFromFavs(String id) {


        favouriteDrinksRepository.deleteById(id);
    }
}

