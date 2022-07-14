package com.github.EazyErik.service;

import com.github.EazyErik.datalayer.Drink;
import com.github.EazyErik.repository.DrinksRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DrinksService {

    private final DrinksRepository drinksRepository;


    public Drink addToFavorite(Drink drinkToAdd,String username) {
        drinkToAdd.setUsername(username);
        return drinksRepository.save(drinkToAdd);
    }

    public List<Drink> getAllMyFavourites(String username) {
        return drinksRepository.findAllByUsername(username);
    }
}
