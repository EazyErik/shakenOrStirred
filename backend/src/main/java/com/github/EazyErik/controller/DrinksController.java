package com.github.EazyErik.controller;


import com.github.EazyErik.service.DrinksService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController("DrinksController")
@RequestMapping("api/addToFav")
@RequiredArgsConstructor
public class DrinksController {


    private final DrinksService drinksService;

}