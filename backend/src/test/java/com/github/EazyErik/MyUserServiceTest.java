package com.github.EazyErik;


import com.github.EazyErik.DataLayer.MyUser;
import com.github.EazyErik.DataLayer.UserCreationData;
import com.github.EazyErik.Repository.MyUserRepo;
import com.github.EazyErik.Service.MyUserService;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Collections;



public class MyUserServiceTest {

    @Test
    void shouldPassIfUserUsedSamePasswords() {
        //given


        MyUserRepo testRepo = Mockito.mock(MyUserRepo.class);
        PasswordEncoder testEncoder = Mockito.mock(PasswordEncoder.class);
        Mockito.when(testEncoder.encode("neb123")).thenReturn("hashedPassword");

        MyUserService testService = new MyUserService(testRepo, testEncoder);


        //when
        testService.createUser(new UserCreationData("ben", "neb123", "neb123"));

        //then

        MyUser testUser = new MyUser();
        testUser.setUsername("ben");
        testUser.setRoles(Collections.singletonList("user"));
        testUser.setPassword("hashedPassword");


        Mockito.verify(testRepo).save(testUser);

    }

    @Test
    void shouldFailIfUserUsedDifferentPasswords() {
        //given

        MyUserService testService = new MyUserService(null, null);


        //when and then
        Assertions.assertThatExceptionOfType(IllegalArgumentException.class)
                .isThrownBy(() -> testService.createUser(new UserCreationData("ben", "neb123", "123")));


    }

    @Test
    void shouldFailIfFirstPasswordIsEmpty() {
        //given

        MyUserService testService = new MyUserService(null,null);

        //when and then
        Assertions.assertThatExceptionOfType(IllegalArgumentException.class)
                .isThrownBy(() -> testService.createUser(new UserCreationData("ben", "", "123")));

    }

    @Test
    void shouldFailIfSecondPasswordIsEmpty() {
        //given

        MyUserService testService = new MyUserService(null,null);

        //when and then
        Assertions.assertThatExceptionOfType(IllegalArgumentException.class)
                .isThrownBy(() -> testService.createUser(new UserCreationData("ben", "ben123", "")));

    }

    @Test
    void shouldFailIfBothPasswordsAreBlank() {
        //given

        MyUserService testService = new MyUserService(null,null);

        //when and then
        Assertions.assertThatExceptionOfType(IllegalArgumentException.class)
                .isThrownBy(() -> testService.createUser(new UserCreationData("ben", " ", " ")));


    }

    @Test
    void shouldFailIfBothPasswordsAreNull() {
        //given

        MyUserService testService = new MyUserService(null,null);

        //when and then
        Assertions.assertThatExceptionOfType(NullPointerException.class)
                .isThrownBy(() -> testService.createUser(new UserCreationData("ben", null, null)));


    }


}
