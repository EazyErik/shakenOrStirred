package com.github.EazyErik;



import com.github.EazyErik.datalayer.FavouriteDrink;
import com.github.EazyErik.repository.FavouriteDrinksRepository;
import com.github.EazyErik.service.DrinksService;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import java.util.List;



public class DrinksServiceTest {

   @Test
    void shouldPassIfDrinkIdIsAdded() {


        //given
        FavouriteDrink testDrink = new FavouriteDrink();
        testDrink.setIdDrink("123");
       FavouriteDrinksRepository testRepo = Mockito.mock(FavouriteDrinksRepository.class);
        DrinksService testService = new DrinksService(testRepo);
        Mockito.when(testRepo.save(testDrink)).thenReturn(testDrink);


        //when

        FavouriteDrink actual = testService.addToFavorite(testDrink, "Hansi");

        //then
        Assertions.assertThat(actual.getIdDrink()).isEqualTo("123");
        Assertions.assertThat(actual.getUsername()).isEqualTo("Hansi");

    }

    @Test
    void shouldReturnDrink() {

        //given
        FavouriteDrink testDrink = new FavouriteDrink();
        testDrink.setIdDrink("123");

        FavouriteDrinksRepository testRepo = Mockito.mock(FavouriteDrinksRepository.class);
        DrinksService testService = new DrinksService(testRepo);
        Mockito.when(testRepo.findAllByUsername("Hansi")).thenReturn(List.of(testDrink));


        //when
        List<FavouriteDrink> actual = testService.getAllMyFavourites("Hansi");

        //then
        Assertions.assertThat(actual.get(0)).isEqualTo(testDrink);

    }

    @Test
    void shouldNotReturnDrink() {

        //given
        FavouriteDrink testDrink = new FavouriteDrink();
        testDrink.setIdDrink("123");

        FavouriteDrinksRepository testRepo = Mockito.mock(FavouriteDrinksRepository.class);
        DrinksService testService = new DrinksService(testRepo);
        Mockito.when(testRepo.findAllByUsername("Klausi")).thenReturn(List.of(testDrink));


        //when
       List<FavouriteDrink> actual = testService.getAllMyFavourites("Hansi");

        //then
        Assertions.assertThat(actual).isEmpty();


    }


}
