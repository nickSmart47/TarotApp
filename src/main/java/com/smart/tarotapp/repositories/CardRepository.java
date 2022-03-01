package com.smart.tarotapp.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.smart.tarotapp.models.Card;

@Repository
public interface CardRepository extends CrudRepository<Card, Long> {
	
	List<Card> findAll();

}
