package com.github.EazyErik.service;


import com.github.EazyErik.datalayer.CustomDrink;
import com.github.EazyErik.repository.CustomDrinksRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomDrinksService {

    private final CustomDrinksRepository customDrinksRepository;


    public CustomDrink addCustomDrink(CustomDrink customDrink, String username ) {
        customDrink.setUsername(username);
        return customDrinksRepository.save(customDrink);
    }
}
