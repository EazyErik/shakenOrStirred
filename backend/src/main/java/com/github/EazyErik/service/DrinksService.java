package com.github.EazyErik.service;

import com.github.EazyErik.datalayer.Drink;
import com.github.EazyErik.repository.DrinksRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DrinksService {

    private final DrinksRepository drinksRepository;


    public Drink addToFavorite(Drink idDrink) {
        return drinksRepository.save(idDrink);
    }
}
