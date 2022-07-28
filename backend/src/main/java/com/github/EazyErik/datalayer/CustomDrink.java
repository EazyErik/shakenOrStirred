package com.github.EazyErik.datalayer;


import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Document(collection = "customDrinks")
@NoArgsConstructor
public class CustomDrink {

    @Id
    private String customIDFromDB;
    private String username;
    private String customDrinkName;
    private String customInstruction;
    private List<CustomIngredient> customIngredients;
    private String customGlass;
    private String customDrinkURL;
}
