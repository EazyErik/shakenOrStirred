package com.github.EazyErik.Controller;

import com.github.EazyErik.Service.MyUserService;
import com.github.EazyErik.DataLayer.UserCreationData;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("api/user")
@RestController
@RequiredArgsConstructor
public class MyUserController {

    private final MyUserService myUserService;

    @PostMapping
    public ResponseEntity<Void> createUser(@RequestBody UserCreationData user) {
        try{
            myUserService.createUser(user);
            return ResponseEntity.ok().build();
        }catch(IllegalArgumentException e) {
           return ResponseEntity.badRequest().build();
        }

    }

}
