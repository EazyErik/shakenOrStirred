package com.github.EazyErik.datalayer;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CustomIngredient {

    private String customAmount;
    private String customUnit;
    private String customIngredientName;
}
