package com.github.EazyErik.DataLayer;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;


@Data
@Document(collection = "cocktailUser")
@NoArgsConstructor
public class MyUser {

    @Indexed(unique = true)
    String username;
    String password;
    @Id
    String id;
    private List<String> roles;

}
