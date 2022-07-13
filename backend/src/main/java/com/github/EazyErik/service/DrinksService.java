package com.github.EazyErik.service;

import com.github.EazyErik.datalayer.Drink;
import com.github.EazyErik.repository.DrinksRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DrinksService {

    private final DrinksRepository drinksRepository;


    public Drink addToFavorite(Drink idDrink) {
        return drinksRepository.save(idDrink);
    }


    public Optional<Drink> getDrinkById(String id) {
        return drinksRepository.findById(id);
    }
}
