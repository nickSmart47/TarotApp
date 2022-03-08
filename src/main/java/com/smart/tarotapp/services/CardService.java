package com.smart.tarotapp.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.smart.tarotapp.models.Card;
import com.smart.tarotapp.repositories.CardRepository;

@Service
public class CardService {

	@Autowired
	private CardRepository cardRepo;
	
	public List<Card> allCards() {
		return cardRepo.findAll();
	}
	
	public Card getRandomCard() {
		Long randomIdNumber = (long) (Math.random() * (78-1) + 1);
//		System.out.println(randomIdNumber);
		
		double randomOrientation = Math.random();
		boolean orientation;
		
		if (randomOrientation > .5) {
			orientation = true;
		}
		else {
			orientation = false;
		}
		
		Optional<Card> optionalCard = cardRepo.findById(randomIdNumber);
		if (optionalCard.isPresent()) {
			Card cardToReturn = optionalCard.get();
			cardToReturn.setUpright(orientation);
			return cardToReturn;
		} else {
			return null;
		}
	}
}
