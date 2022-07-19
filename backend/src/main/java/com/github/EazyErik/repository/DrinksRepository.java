package com.github.EazyErik.repository;


import com.github.EazyErik.datalayer.Drink;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository

public interface DrinksRepository extends MongoRepository<Drink, String> {

    List<Drink> findAllByUsername(String username);

    int countAllByUsername(String username);




}
