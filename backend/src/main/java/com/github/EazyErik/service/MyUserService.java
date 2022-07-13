package com.github.EazyErik.service;

import com.github.EazyErik.datalayer.MyUser;
import com.github.EazyErik.repository.MyUserRepo;
import com.github.EazyErik.datalayer.UserCreationData;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MyUserService {

    private final MyUserRepo myUserRepo;
    private final PasswordEncoder encoder;


    public void createUser(UserCreationData user) {

        if (user.getPassword() == null
                ||
                user.getPasswordAgain() == null
                || !Objects.equals(user.getPassword(), user.getPasswordAgain())
                || user.getPassword().isBlank()
                || user.getPasswordAgain().isBlank()) {
            throw new IllegalArgumentException("passwords do not match");
        }


        String encodedPassword = encoder.encode(user.getPassword());
        MyUser myUser = new MyUser();
        myUser.setUsername(user.getUsername());
        myUser.setPassword(encodedPassword);
        myUser.setRoles(Collections.singletonList("user"));
        myUserRepo.save(myUser);


    }

    public Optional<MyUser> findByUserName(String username) {
        return myUserRepo.findByUsername(username);
    }
}
