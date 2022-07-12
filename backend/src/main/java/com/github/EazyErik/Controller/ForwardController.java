package com.github.EazyErik.Controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ForwardController {

    @RequestMapping(value = "/**/{[path:[^\\.]*}")
    public String forwardToRouterUrl() {
        return "forward:/";
    }
}
