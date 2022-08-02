package com.github.EazyErik;

import com.github.EazyErik.datalayer.CustomDrink;
import com.github.EazyErik.datalayer.CustomIngredient;
import com.github.EazyErik.datalayer.MyUser;
import com.github.EazyErik.repository.CustomDrinksRepository;
import com.github.EazyErik.service.CustomDrinksService;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.ArrayList;
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


    }

    @Test
    void shouldNOTPassIfInstructionsAreBlank() {


        //given

        CustomDrink newDrink = new CustomDrink();
        newDrink.setCustomDrinkName("Sazerc");
        newDrink.setCustomDrinkURL("cocktial Picture");
        newDrink.setCustomInstruction("");
        newDrink.setCustomIngredients(List.of(new CustomIngredient("6","cl","Rye Whiskey")));
        newDrink.setCustomGlass("tumbler");


        //when and then
        CustomDrinksService testService = new CustomDrinksService(null);
        Assertions.assertThatExceptionOfType(IllegalArgumentException.class)
                .isThrownBy(()-> testService.addCustomDrink(newDrink,"Harri"));


    }
    @Test
    void shouldNOTPassIfDrinkURLisBlank() {


        //given

        CustomDrink newDrink = new CustomDrink();
        newDrink.setCustomDrinkName("Sazerc");
        newDrink.setCustomDrinkURL("");
        newDrink.setCustomInstruction("just do it");
        newDrink.setCustomIngredients(List.of(new CustomIngredient("6", "cl", "Rye Whiskey")));
        newDrink.setCustomGlass("tumbler");


        //when and then
        CustomDrinksService testService = new CustomDrinksService(null);
        Assertions.assertThatExceptionOfType(IllegalArgumentException.class)
                .isThrownBy(() -> testService.addCustomDrink(newDrink, "Harri"));


    }

    @Test
    void shouldNOTPassIfIngredientNameIsBlank() {


        //given

        CustomDrink newDrink = new CustomDrink();
        newDrink.setCustomDrinkName("Sazerc");
        newDrink.setCustomDrinkURL("CocktailPicture");
        newDrink.setCustomInstruction("just do it");
        newDrink.setCustomIngredients(List.of(new CustomIngredient("6", "cl", "")));
        newDrink.setCustomGlass("tumbler");


        //when and then
        CustomDrinksService testService = new CustomDrinksService(null);
        Assertions.assertThatExceptionOfType(IllegalArgumentException.class)
                .isThrownBy(() -> testService.addCustomDrink(newDrink, "Harri"));


    }

    @Test
    void shouldNOTPassIfGlassIsBlank() {


        //given

        CustomDrink newDrink = new CustomDrink();
        newDrink.setCustomDrinkName("Sazerc");
        newDrink.setCustomDrinkURL("CocktailPicture");
        newDrink.setCustomInstruction("just do it");
        newDrink.setCustomIngredients(List.of(new CustomIngredient("6", "cl", "Ryw Whiskey")));
        newDrink.setCustomGlass("");


        //when and then
        CustomDrinksService testService = new CustomDrinksService(null);
        Assertions.assertThatExceptionOfType(IllegalArgumentException.class)
                .isThrownBy(() -> testService.addCustomDrink(newDrink, "Harri"));


    }


        @Test
    void shouldPassIfOneDrinkIsReturnWhenIPassTheIngredientOfTheSearchedDrink(){

        //given
        String ingredient = "Rye Whiskey";

        CustomDrink newDrink = new CustomDrink();
        newDrink.setCustomDrinkName("testDrink");
        newDrink.setCustomDrinkURL("cocktailPicture");
        newDrink.setCustomInstruction("just do it!");
        newDrink.setCustomIngredients(List.of(new CustomIngredient("6","cl","Rye Whiskey")));
        newDrink.setCustomGlass("tumbler");



            CustomDrink secondDrink = new CustomDrink();
            secondDrink.setCustomDrinkName("testDrink");
            secondDrink.setCustomDrinkURL("cocktailPicture");
            secondDrink.setCustomInstruction("just do it!");
            secondDrink.setCustomIngredients(List.of(new CustomIngredient("6","cl","Vodka")));
            secondDrink.setCustomGlass("tumbler");




        CustomDrinksRepository testRepo = Mockito.mock(CustomDrinksRepository.class);
        Mockito.when(testRepo.findAll()).thenReturn(List.of(newDrink,secondDrink));
        CustomDrinksService customDrinksService = new CustomDrinksService(testRepo);

        //when

        List<CustomDrink> actual = customDrinksService.getCustomDrinks(ingredient);

        //then
        Assertions.assertThat(actual.size()).isEqualTo(1);

        Assertions.assertThat(
                actual.get(0).getCustomIngredients()
                .get(0).getCustomIngredientName())
                .isEqualTo("Rye Whiskey");


    }

    @Test
    void shouldPassIfDrinkIsReturned() {

        //given
        CustomDrink newDrink = new CustomDrink();
        newDrink.setCustomDrinkName("testDrink");
        newDrink.setCustomDrinkURL("cocktailPicture");
        newDrink.setCustomInstruction("just do it!");
        newDrink.setCustomIngredients(List.of(new CustomIngredient("6","cl","Rye Whiskey")));
        newDrink.setCustomGlass("tumbler");

        CustomDrink secondDrink = new CustomDrink();
        secondDrink.setCustomDrinkName("testDrink");
        secondDrink.setCustomDrinkURL("cocktailPicture");
        secondDrink.setCustomInstruction("just do it!");
        secondDrink.setCustomIngredients(List.of(new CustomIngredient("6","cl","Vodka")));
        secondDrink.setCustomGlass("tumbler");




        CustomDrinksRepository testRepo = Mockito.mock(CustomDrinksRepository.class);
        CustomDrinksService customDrinksService = new CustomDrinksService(testRepo);

        //when
        Mockito.when(testRepo.findAll()).thenReturn(List.of(newDrink,secondDrink));
        List<CustomDrink> actual = customDrinksService.getCustomDrinks(null);

        //then
        Assertions.assertThat(actual.size()).isEqualTo(2);

    }

    @Test
    void shouldReturnDrinkForPassedID() {

        //given
        CustomDrink newDrink = new CustomDrink();
        newDrink.setCustomIDFromDB("1234");
        newDrink.setCustomDrinkName("testDrink");
        newDrink.setCustomDrinkURL("cocktailPicture");
        newDrink.setCustomInstruction("just do it!");
        newDrink.setCustomIngredients(List.of(new CustomIngredient("6","cl","Rye Whiskey")));
        newDrink.setCustomGlass("tumbler");

        CustomDrinksRepository testRepo = Mockito.mock(CustomDrinksRepository.class);
        CustomDrinksService customDrinksService = new CustomDrinksService(testRepo);

        //when

        Mockito.when(testRepo.findCustomDrinkByCustomIDFromDB("1234")).thenReturn(newDrink);
        CustomDrink actual = customDrinksService.getCustomDrink("1234");

        //then

        Assertions.assertThat(actual).isEqualTo(newDrink);


    }

    @Test

    void shouldReturnListOfIngredientNames() {

        //given
        CustomDrink firstDrink = new CustomDrink();
        firstDrink.setCustomDrinkName("testDrink");
        firstDrink.setCustomDrinkURL("cocktailPicture");
        firstDrink.setCustomInstruction("just do it!");
        firstDrink.setCustomIngredients(List.of(new CustomIngredient("6","cl","Rye Whiskey"),new CustomIngredient("12","cl","Red Bull")));
        firstDrink.setCustomGlass("tumbler");

        CustomDrink secondDrink = new CustomDrink();
        secondDrink.setCustomDrinkName("testDrink");
        secondDrink.setCustomDrinkURL("cocktailPicture");
        secondDrink.setCustomInstruction("just do it!");
        secondDrink.setCustomIngredients(List.of(new CustomIngredient("6","cl","Vodka"),new CustomIngredient("12","cl","Red Bull")));
        secondDrink.setCustomGlass("tumbler");


        CustomDrinksRepository testRepo = Mockito.mock(CustomDrinksRepository.class);
        CustomDrinksService customDrinksService = new CustomDrinksService(testRepo);

        //when

        Mockito.when(testRepo.findAll()).
                thenReturn(List.of(firstDrink,secondDrink));

        List<String> actual = customDrinksService.getAllIngredients();

        Assertions.assertThat(actual).containsExactly("Rye Whiskey","Red Bull","Vodka");




    }


}
