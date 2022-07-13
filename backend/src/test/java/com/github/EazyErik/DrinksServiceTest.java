package com.github.EazyErik;


import com.github.EazyErik.datalayer.Drink;
import com.github.EazyErik.repository.DrinksRepository;
import com.github.EazyErik.service.DrinksService;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;


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
        Drink actual = testService.addToFavorite(testDrink);

        //then
        Assertions.assertThat(actual.getIdDrink()).isEqualTo("123");

    }

    @Test
    void shouldReturnDrink() {

        //given
        Drink testDrink = new Drink();
        testDrink.setIdDrink("123");
        DrinksRepository testRepo = Mockito.mock(DrinksRepository.class);
        DrinksService testService = new DrinksService(testRepo);
        Mockito.when(testRepo.findById("123")).thenReturn(Optional.of(testDrink));


        //when
        Optional<Drink> actual = testService.getDrinkById("123");

        //then
        Assertions.assertThat(actual.get()).isEqualTo(testDrink);

    }

    @Test
    void shouldNotReturnDrink() {

        //given
        Drink testDrink = new Drink();
        testDrink.setIdDrink("123");
        DrinksRepository testRepo = Mockito.mock(DrinksRepository.class);
        DrinksService testService = new DrinksService(testRepo);
        Mockito.when(testRepo.findById("1234")).thenReturn(Optional.empty());


        //when
        Optional<Drink> actual = testService.getDrinkById("1234");

        //then
        Assertions.assertThat(actual).isEmpty();


    }


}
