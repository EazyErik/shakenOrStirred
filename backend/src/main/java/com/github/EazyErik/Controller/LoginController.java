package com.github.EazyErik.Controller;


import com.github.EazyErik.DataLayer.LoginData;
import com.github.EazyErik.DataLayer.LoginResponse;
import com.github.EazyErik.DataLayer.MyUser;
import com.github.EazyErik.Service.MyUserService;
import com.github.EazyErik.security.JWTService;
import lombok.RequiredArgsConstructor;
import lombok.extern.java.Log;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;


@RestController

@RequiredArgsConstructor
@RequestMapping("api/login")
public class LoginController {

    private static final Logger LOGGER= LoggerFactory.getLogger(LoginController.class);

    private final AuthenticationManager authenticationManager;
    private final JWTService jwtService;
    private final MyUserService myUserService;

    @PostMapping
    public ResponseEntity<LoginResponse> login(@RequestBody LoginData loginData) {

        try{

            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginData.getUsername(),loginData.getPassword()));
            MyUser user = myUserService.findByUserName(loginData.getUsername()).orElseThrow();
            Map<String,Object> claims = new HashMap<>();
            claims.put("roles",user.getRoles());
            return ResponseEntity.ok(new LoginResponse(jwtService.createToken(claims,loginData.getUsername())));

        }catch (Exception e) {
            LOGGER.info(e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

}
