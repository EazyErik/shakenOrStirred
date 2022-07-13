package com.github.EazyErik.service;

import com.github.EazyErik.repository.DrinksRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DrinksService {

    private final DrinksRepository drinksRepository;

}
