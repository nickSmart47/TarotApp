package com.smart.tarotapp.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.smart.tarotapp.models.Spread;
import com.smart.tarotapp.repositories.SpreadRepository;

@Service
public class SpreadService {

	@Autowired
	private SpreadRepository spreadRepo;
	
	public List<Spread> allSpreads(){
		return spreadRepo.findAll();
	}
	
	public Spread getSpread(Long id) {
		
		Optional<Spread> optionalSpread = spreadRepo.findById(id);
		
		Spread spread = optionalSpread.get();
		
		return spread;
	}
	
	public Spread createSpread(Spread s) {
		return spreadRepo.save(s);
	}
}
