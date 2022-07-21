package com.github.EazyErik.datalayer;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CustomIngredient {

    private String amount;
    private String unit;
    private String name;
}
