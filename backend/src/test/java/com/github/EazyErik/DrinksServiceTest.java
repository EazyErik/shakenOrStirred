package com.github.EazyErik;


import com.github.EazyErik.datalayer.Drink;
import com.github.EazyErik.datalayer.MyUser;
import com.github.EazyErik.repository.DrinksRepository;
import com.github.EazyErik.service.DrinksService;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;


import java.util.HashMap;
import java.util.List;
import java.util.Optional;


public class DrinksServiceTest {

   @Test
    void shouldPassIfDrinkIdIsAdded() {


        //given
        Drink testDrink = new Drink();
        testDrink.setIdDrink("123");
        DrinksRepository testRepo = Mockito.mock(DrinksRepository.class);
        DrinksService testService = new DrinksService(testRepo);
        Mockito.when(testRepo.save(testDrink)).thenReturn(testDrink);


        //when

        Drink actual = testService.addToFavorite(testDrink, "Hansi");

        //then
        Assertions.assertThat(actual.getIdDrink()).isEqualTo("123");
        Assertions.assertThat(actual.getUsername()).isEqualTo("Hansi");

    }

    @Test
    void shouldReturnDrink() {

        //given
        Drink testDrink = new Drink();
        testDrink.setIdDrink("123");

        DrinksRepository testRepo = Mockito.mock(DrinksRepository.class);
        DrinksService testService = new DrinksService(testRepo);
        Mockito.when(testRepo.findAllByUsername("Hansi")).thenReturn(List.of(testDrink));


        //when
        List<Drink> actual = testService.getAllMyFavourites("Hansi");

        //then
        Assertions.assertThat(actual.get(0)).isEqualTo(testDrink);

    }

    @Test
    void shouldNotReturnDrink() {

        //given
        Drink testDrink = new Drink();
        testDrink.setIdDrink("123");

        DrinksRepository testRepo = Mockito.mock(DrinksRepository.class);
        DrinksService testService = new DrinksService(testRepo);
        Mockito.when(testRepo.findAllByUsername("Klausi")).thenReturn(List.of(testDrink));


        //when
       List<Drink> actual = testService.getAllMyFavourites("Hansi");

        //then
        Assertions.assertThat(actual).isEmpty();


    }


}
