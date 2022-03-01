package com.smart.tarotapp.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smart.tarotapp.models.Card;
import com.smart.tarotapp.services.CardService;

@RestController()
@RequestMapping("/api")
public class CardApi {

	@Autowired
	private CardService cardServ;
	
	@GetMapping("/cards")
	public List<Card> allCards(){
		return cardServ.allCards();
	}
	
	@GetMapping("/cards/random")
	public Card randomCard() {
		return cardServ.getRandomCard();
	}
}
