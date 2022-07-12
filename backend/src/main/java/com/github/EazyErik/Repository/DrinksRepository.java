package com.github.EazyErik.Repository;


import com.github.EazyErik.DataLayer.Drink;
import lombok.Data;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface DrinksRepository extends MongoRepository<Drink,String> {
}
