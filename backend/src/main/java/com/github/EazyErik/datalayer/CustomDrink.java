package com.github.EazyErik.datalayer;


import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "customDrinks")
@NoArgsConstructor
public class CustomDrink {

    @Id
    private String customIDFromDB;
    private boolean isCustomDrink = true;
    private String username;
    private String customInstruction;
    private String customIngredient;
    private String customGlass;
}
