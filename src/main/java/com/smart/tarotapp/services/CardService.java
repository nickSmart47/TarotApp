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
		
		Optional<Card> optionalCard = cardRepo.findById(randomIdNumber);
		if (optionalCard.isPresent()) {
			return optionalCard.get();
		} else {
			return null;
		}
	}
}
