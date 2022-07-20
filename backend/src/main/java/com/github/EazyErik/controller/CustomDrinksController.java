package com.github.EazyErik.controller;


import com.github.EazyErik.datalayer.CustomDrink;
import com.github.EazyErik.service.CustomDrinksService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("api/customDrink")
@RequiredArgsConstructor
public class CustomDrinksController {

    private final CustomDrinksService customDrinksService;



    @PostMapping
    public CustomDrink addCustomDrink(@RequestBody CustomDrink customDrink, Principal username) {
        return customDrinksService.addCustomDrink(customDrink,username.getName());

    }



}
