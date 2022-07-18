package com.github.EazyErik.service;

import com.github.EazyErik.controller.LoginController;
import com.github.EazyErik.datalayer.Drink;
import com.github.EazyErik.datalayer.MyUser;
import com.github.EazyErik.repository.DrinksRepository;
import com.github.EazyErik.repository.MyUserRepo;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;


import java.util.List;


@Service
@RequiredArgsConstructor
public class DrinksService {

    private final DrinksRepository drinksRepository;




    public Drink addToFavorite(Drink drinkToAdd, String username) {
        drinkToAdd.setUsername(username);
       return drinksRepository.save(drinkToAdd);
    }

    public List<Drink> getAllMyFavourites(String username) {
      return drinksRepository.findAllByUsername(username);



        }
    }

