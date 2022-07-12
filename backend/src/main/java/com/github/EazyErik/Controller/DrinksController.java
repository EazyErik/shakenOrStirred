package com.github.EazyErik.Controller;


import com.github.EazyErik.Service.DrinksService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController("DrinksController")
@RequestMapping("api/addToFav")
@RequiredArgsConstructor
public class DrinksController {


    public DrinksService drinksService;

}
