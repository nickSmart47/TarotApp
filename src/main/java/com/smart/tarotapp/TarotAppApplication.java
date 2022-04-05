package com.smart.tarotapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication(exclude = {
		org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration.class})
public class TarotAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(TarotAppApplication.class, args);
	}


}
