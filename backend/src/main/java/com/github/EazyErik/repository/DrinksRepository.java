package com.github.EazyErik.repository;


import com.github.EazyErik.datalayer.Drink;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface DrinksRepository extends MongoRepository<Drink, String> {




}
