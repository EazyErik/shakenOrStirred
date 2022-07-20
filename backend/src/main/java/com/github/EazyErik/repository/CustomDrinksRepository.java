package com.github.EazyErik.repository;


import com.github.EazyErik.datalayer.CustomDrink;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomDrinksRepository extends MongoRepository<CustomDrink,String> {



}
