package com.github.EazyErik.Service;

import com.github.EazyErik.DataLayer.MyUser;
import com.github.EazyErik.Repository.MyUserRepo;
import com.github.EazyErik.DataLayer.UserCreationData;
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

        if (!Objects.equals(user.getPassword(), user.getPasswordAgain())) {
            throw new IllegalArgumentException("password do not match");
        }


        String encodedPassword = encoder.encode(user.getPassword());
        MyUser myUser = new MyUser();
        myUser.setUsername(user.getUsername());
        myUser.setPassword(encodedPassword);
        myUser.setPasswordAgain(encodedPassword);
        myUser.setRoles(Collections.singletonList("user"));
        myUserRepo.save(myUser);


    }
    public Optional<MyUser> findByUserName(String username) {
        return myUserRepo.findByUsername(username);
    }
}
