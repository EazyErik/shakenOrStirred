package com.github.EazyErik.repository;

import com.github.EazyErik.datalayer.FavouriteDrink;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository

public interface FavouriteDrinksRepository extends MongoRepository<FavouriteDrink, String> {

    List<FavouriteDrink> findAllByUsername(String username);

    int countAllByUsername(String username);

    void deleteByIdDrink(String idDrink);




}
