package com.github.EazyErik.Service;

import com.github.EazyErik.Repository.DrinksRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DrinksService {

    private final DrinksRepository drinksRepository;

}
