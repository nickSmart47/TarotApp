package com.smart.tarotapp.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smart.tarotapp.services.UserService;

@RestController()
@RequestMapping("/api")
public class UserApi {

	@Autowired
	private UserService userServ;
	
//	
}

