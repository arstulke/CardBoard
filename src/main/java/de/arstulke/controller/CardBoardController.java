package de.arstulke.controller;

import de.arstulke.model.Card;
import de.arstulke.model.CardBoard;
import de.arstulke.model.Log;
import de.arstulke.repositories.CardBoardRepository;
import de.arstulke.repositories.CardRepository;
import de.arstulke.repositories.LogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

/**
 * Created CardBoardController.java in de.arstulke.controller
 * by Arne on 03.03.2017.
 */
@RestController
@CrossOrigin
@RequestMapping("card-board")
public class CardBoardController {

    @Autowired
    private CardBoardRepository cardBoardRepo;
    @Autowired
    private CardRepository cardRepo;
    @Autowired
    private LogRepository logRepo;

    @Transactional
    @GetMapping(value = "", produces = "application/json")
    public List<CardBoard> readAll() {
        return cardBoardRepo.findAll();
    }

    @Transactional
    @GetMapping(value = "/{id}", produces = "application/json")
    public CardBoard read(@PathVariable Long id) {
        return cardBoardRepo.findOne(id);
    }

    @Transactional
    @DeleteMapping(value = "/{id}", produces = "application/json")
    public void delete(@PathVariable Long id) {
        String old = cardBoardRepo.findOne(id).toString();
        cardBoardRepo.delete(id);
        logRepo.save(new Log(" - Deleted\n\t" + old + "\n\t"));
    }

    @Transactional
    @PostMapping(value = "", produces = "application/json", consumes = "application/json")
    public CardBoard createCardBoard(@RequestBody CardBoard cardBoard) {
        if (cardBoard.getCards() == null) {
            cardBoard.setCards(new ArrayList<>());
        }
        cardBoard = cardBoardRepo.save(cardBoard);
        logRepo.save(new Log(" - Created\n\t" + cardBoard + "\n\t"));
        return cardBoard;
    }

    @Transactional
    @PutMapping(value = "/{id}/card", produces = "application/json", consumes = "application/json")
    public CardBoard createCard(@RequestBody Card card, @PathVariable Long id) {
        CardBoard cardBoard = cardBoardRepo.findOne(id);

        card.setCardBoard(cardBoard);
        cardBoard.getCards().add(card);

        Util.moveAll(card, cardBoard);
        cardRepo.save(card);
        cardBoardRepo.save(cardBoard);
        logRepo.save(new Log(" - Added\n\t" + card + "\n\tto " + cardBoard + "\n\t"));
        return cardBoard;
    }

    @Transactional
    @PutMapping(value = "/{id}/name", produces = "application/json", consumes = "application/json")
    public CardBoard updateName(@RequestBody String name, @PathVariable Long id) {
        CardBoard cardBoard = cardBoardRepo.findOne(id);
        String old = cardBoard.toString();

        cardBoard.setName(name);

        logRepo.save(new Log(" - Renamed\n\t" + old + "\n\tto " + cardBoard.getName() + "\n\t"));
        return cardBoardRepo.save(cardBoard);
    }
}
