package com.smart.tarotapp.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smart.tarotapp.models.Spread;
import com.smart.tarotapp.services.SpreadService;

@RestController()
@RequestMapping("/api")
public class SpreadApi {
	
	@Autowired
	private SpreadService spreadServ;
	
	@GetMapping("/spreads")
	public List<Spread> allSpreads(){
		return spreadServ.allSpreads();
	}
	
	@GetMapping("/spreads/{id}")
	public Spread getSpread(@PathVariable("id") Long id) {
		return spreadServ.getSpread(id);
	}
	
	@PostMapping("/spreads")
	public Spread createSpread(@RequestBody Spread spreadObj) {
		Spread spread = spreadObj;
//		System.out.println(spread);
		return spreadServ.createSpread(spread);
	}

}
