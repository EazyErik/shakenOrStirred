package com.github.EazyErik.datalayer;


import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@Document(collection = "Drinks")
public class Drink {

    @Id
    private String idDrink;
    private String username;



}
