package com.smart.tarotapp.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.smart.tarotapp.models.Spread;

public interface SpreadRepository extends CrudRepository<Spread, Long> {

	List<Spread> findAll();
}
