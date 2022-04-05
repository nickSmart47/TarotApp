package com.smart.tarotapp.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController {

    @RequestMapping(value = {"/", "/cards", "/spreads"})
    public String home() {
        return "index.html";
    }


}
