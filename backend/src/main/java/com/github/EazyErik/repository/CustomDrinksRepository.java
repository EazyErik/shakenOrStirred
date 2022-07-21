package com.github.EazyErik.repository;


import com.github.EazyErik.datalayer.CustomDrink;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.security.Principal;
import java.util.List;

@Repository
public interface CustomDrinksRepository extends MongoRepository<CustomDrink,String> {

    List<CustomDrink> findAllByUsername(String username);



}
