package com.github.EazyErik.datalayer;

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

    @Id
    private String id;
    @Indexed(unique = true)
    private String username;
    private String password;

    private List<String> roles;

}
