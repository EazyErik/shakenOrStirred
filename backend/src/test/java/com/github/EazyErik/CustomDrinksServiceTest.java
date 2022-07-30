package com.github.EazyErik;

import com.github.EazyErik.datalayer.CustomDrink;
import com.github.EazyErik.datalayer.CustomIngredient;
import com.github.EazyErik.datalayer.MyUser;
import com.github.EazyErik.repository.CustomDrinksRepository;
import com.github.EazyErik.service.CustomDrinksService;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.List;

public class CustomDrinksServiceTest {



    @Test
    void shouldPassIfRequiredInputIsNotBlank() {

        //given


        CustomDrink newDrink = new CustomDrink();
        newDrink.setCustomDrinkName("Sazerac");
        newDrink.setCustomDrinkURL("cocktailPicture");
        newDrink.setCustomInstruction("just do it!");
        newDrink.setCustomIngredients(List.of(new CustomIngredient("6","cl","Rye Whiskey")));
        newDrink.setCustomGlass("tumbler");



        CustomDrink drinkToSave = new CustomDrink();
        drinkToSave.setCustomDrinkName("Sazerac");
        drinkToSave.setCustomDrinkURL("cocktailPicture");
        drinkToSave.setCustomInstruction("just do it!");
        drinkToSave.setCustomIngredients(List.of(new CustomIngredient("6","cl","Rye Whiskey")));
        drinkToSave.setCustomGlass("tumbler");
        drinkToSave.setUsername("Harri");

        CustomDrink savedDrink = new CustomDrink();
        savedDrink.setCustomDrinkName("Sazerac");
        savedDrink.setCustomDrinkURL("cocktailPicture");
        savedDrink.setCustomInstruction("just do it!");
        savedDrink.setCustomIngredients(List.of(new CustomIngredient("6","cl","Rye Whiskey")));
        savedDrink.setCustomGlass("tumbler");
        savedDrink.setCustomIDFromDB("1");
        savedDrink.setUsername("Harri");

        CustomDrinksRepository testRepo = Mockito.mock(CustomDrinksRepository.class);

        CustomDrinksService testService = new CustomDrinksService(testRepo);


        //when
        Mockito.when(testRepo.save(drinkToSave)).thenReturn(savedDrink);
        CustomDrink actual = testService.addCustomDrink(newDrink, "Harri");



        //then
       Assertions.assertThat(actual).isEqualTo(savedDrink);

    }

    @Test
    void shouldNOTPassIfRequiredInputIsBlank() {


        //given

        CustomDrink newDrink = new CustomDrink();
        newDrink.setCustomDrinkName("");
        newDrink.setCustomDrinkURL("cocktailPicture");
        newDrink.setCustomInstruction("just do it!");
        newDrink.setCustomIngredients(List.of(new CustomIngredient("6","cl","Rye Whiskey")));
        newDrink.setCustomGlass("tumbler");


        //when and then
        CustomDrinksService testService = new CustomDrinksService(null);
        Assertions.assertThatExceptionOfType(IllegalArgumentException.class)
                .isThrownBy(()-> testService.addCustomDrink(newDrink,"Harri"));


    }

    @Test
    void shouldNOTPassIfRequiredInputIsNull() {


        //given

        CustomDrink newDrink = new CustomDrink();
        newDrink.setCustomDrinkName(null);
        newDrink.setCustomDrinkURL("cocktailPicture");
        newDrink.setCustomInstruction("just do it!");
        newDrink.setCustomIngredients(List.of(new CustomIngredient("6","cl","Rye Whiskey")));
        newDrink.setCustomGlass("tumbler");



        CustomDrinksService testService = new CustomDrinksService(null);
        Assertions.assertThatExceptionOfType(IllegalArgumentException.class)
                .isThrownBy(()-> testService.addCustomDrink(newDrink,"Harri"));

        //when






    }


}
