package com.github.EazyErik;



import com.github.EazyErik.datalayer.*;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.*;

import java.sql.Date;
import java.time.Duration;
import java.time.Instant;
import java.util.HashMap;


@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class ShakenOrStirredControllerTestIT {


    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    void shouldTestTheWholeApp() {
        //register new user

        UserCreationData newUser = new UserCreationData();
        newUser.setUsername("Hansi");
        newUser.setPassword("1234");
        newUser.setPasswordAgain("1234");

        ResponseEntity<Void> registeredUserResponse = restTemplate.postForEntity("/api/user", newUser, Void.class);
        Assertions.assertThat(registeredUserResponse.getStatusCode()).isEqualTo(HttpStatus.OK);

        //should NOT register user

        UserCreationData rejectedUser = new UserCreationData();
        rejectedUser.setUsername("Berti");
        rejectedUser.setPassword("1234");
        rejectedUser.setPasswordAgain("432");

        ResponseEntity<Void> rejectedUserResponse = restTemplate.postForEntity("/api/user", rejectedUser, Void.class);
        Assertions.assertThat(rejectedUserResponse.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);

        //create new user

        LoginData loggedInUser = new LoginData();
        loggedInUser.setUsername("Hansi");
        loggedInUser.setPassword("1234");

        ResponseEntity<LoginResponse> createdUserResponse = restTemplate.postForEntity("/api/login", loggedInUser, LoginResponse.class);
        Assertions.assertThat(createdUserResponse.getStatusCode()).isEqualTo(HttpStatus.OK);

        String jwt = createdUserResponse.getBody().getToken();
        Assertions.assertThat(jwt).isNotBlank();

       // add a drink to your favourites

        FavouriteDrink newFavouriteDrink = new FavouriteDrink();
        newFavouriteDrink.setSource("public_api");
        newFavouriteDrink.setUsername(loggedInUser.getUsername());
        newFavouriteDrink.setIdDrink("10777");

        ResponseEntity<FavouriteDrink> addedFavouriteResponse = restTemplate.exchange(
                "/api/favourites",
                HttpMethod.POST,
                new HttpEntity<>(newFavouriteDrink,createHeaders(jwt)),
                FavouriteDrink.class);

        Assertions.assertThat(addedFavouriteResponse.getStatusCode()).isEqualTo(HttpStatus.OK);


        // get all your favourite drinks

        ResponseEntity<FavouriteDrink[]> getAllFavouritesResponse = restTemplate.exchange(
                "/api/favourites",
                HttpMethod.GET,
                new HttpEntity<>(createHeaders(jwt)),
                FavouriteDrink[].class);

        Assertions.assertThat(getAllFavouritesResponse.getBody().length).isEqualTo(1);
        Assertions.assertThat(getAllFavouritesResponse.getBody()[0].getIdDrink()).isEqualTo(newFavouriteDrink.getIdDrink());


        //delete a favourite drink

        ResponseEntity<Void> deleteFavouriteResponse = restTemplate.exchange(
                "/api/favourites/" + newFavouriteDrink.getIdDrink(),
                HttpMethod.DELETE,
                new HttpEntity<>(newFavouriteDrink.getIdDrink(), createHeaders(jwt)),
                Void.class);

        Assertions.assertThat(deleteFavouriteResponse.getStatusCode()).isEqualTo(HttpStatus.OK);

        ResponseEntity<FavouriteDrink[]> getAllLatestFavouritesResponse = restTemplate.exchange(
                "/api/favourites",
                HttpMethod.GET,
                new HttpEntity<>(createHeaders(jwt)),
                FavouriteDrink[].class);
        Assertions.assertThat(getAllLatestFavouritesResponse.getBody().length).isEqualTo(0);



    }

    @Test
    void shouldHandleExpiredJWT(){

        String expiredToken = Jwts.builder()
                .setClaims(new HashMap<>())
                .setSubject("userId")
                .setIssuedAt(Date.from(Instant.now()))
                .setExpiration(Date.from(Instant.now().minus(Duration.ofHours(4))))
                .signWith(SignatureAlgorithm.HS256, "secret_Secret")
                .compact();

        ResponseEntity<FavouriteDrink[]> getAllFavouritesResponse = restTemplate.exchange(
                "/api/favourites",
                HttpMethod.GET,
                new HttpEntity<>(createHeaders(expiredToken)),
                FavouriteDrink[].class);

        Assertions.assertThat(getAllFavouritesResponse.getStatusCode()).isEqualTo(HttpStatus.FORBIDDEN);

    }

    private HttpHeaders createHeaders(String jwt) {
        String authHeaderValue = "Bearer " + jwt;
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", authHeaderValue);
        return headers;
    }


}
