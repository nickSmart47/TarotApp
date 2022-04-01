package com.smart.tarotapp.services;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.smart.tarotapp.models.Card;
import com.smart.tarotapp.repositories.CardRepository;

@Service
public class CardService {

    @Autowired
    private CardRepository cardRepo;

    public List<Card> allCardsShuffled() {

        Random r = new Random();

        List<Card> cards = cardRepo.findAll();

        for (int i = 77; i > 0; i--) {

            int j = r.nextInt(i + 1);

            Collections.swap(cards, i, j);
        }
        return cards;
    }

    public List<Card> allCards() {

        return cardRepo.findAll();
    }

    public Card getRandomCard(boolean reverse) {
        Long randomIdNumber = (long) (Math.random() * (78 - 1) + 1);

        boolean orientation;
        if (reverse) {
            double randomOrientation = Math.random();

            if (randomOrientation > .5) {
                orientation = true;
            } else {
                orientation = false;
            }
        } else {
            orientation = true;
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
