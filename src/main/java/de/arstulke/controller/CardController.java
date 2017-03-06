package de.arstulke.controller;

import de.arstulke.model.Card;
import de.arstulke.model.CardBoard;
import de.arstulke.model.Log;
import de.arstulke.model.Position;
import de.arstulke.repositories.CardBoardRepository;
import de.arstulke.repositories.CardRepository;
import de.arstulke.repositories.LogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

/**
 * Created CardController.java in de.arstulke.controller
 * by Arne on 03.03.2017.
 */
@RestController
@CrossOrigin
@RequestMapping("card")
public class CardController {

    @Autowired
    private CardRepository cardRepo;
    @Autowired
    private CardBoardRepository cardBoardRepo;
    @Autowired
    private LogRepository logRepo;

    @Transactional
    @GetMapping(value = "/{id}", produces = "application/json")
    public Card read(@PathVariable Long id) {
        return cardRepo.findOne(id);
    }

    @Transactional
    @DeleteMapping(value = "/{id}")
    public void delete(@PathVariable Long id) {
        Card card = cardRepo.findOne(id);
        CardBoard cardBoard = card.getCardBoard();
        cardBoard.getCards().remove(card);

        Util.moveAll(null, cardBoard);

        cardRepo.delete(card);
        cardBoardRepo.save(cardBoard);

        logRepo.save(new Log(" - Deleted\n\t" + card + "\n\tfrom " + cardBoard + "\n\t", cardBoard));
    }

    @Transactional
    @PutMapping(value = "/{id}", produces = "application/json", consumes = "application/json")
    public Card update(@RequestBody Card newCard, @PathVariable Long id) {
        Card card = cardRepo.findOne(id);
        String old = card.toString();

        card.setText(newCard.getText());
        card.setTextColor(newCard.getTextColor());
        card.setBackgroundColor(newCard.getBackgroundColor());

        logRepo.save(new Log(" - Updated\n\t" + old + "\n\tto " + card + "\n\t", card.getCardBoard()));
        return cardRepo.save(card);
    }

    @Transactional
    @PutMapping(value = "/{id}/position", produces = "application/json", consumes = "application/json")
    public Card move(@RequestBody Position newPosition, @PathVariable Long id) {
        Card card = cardRepo.findOne(id);
        String old = card + "\n\tfrom " + card.getPosition();
        card.setPosition(newPosition);

        Util.moveAll(card, card.getCardBoard());

        logRepo.save(new Log(" - Moved\n\t" + old + "\n\tto " + card.getPosition() + "\n\t", card.getCardBoard()));
        return cardRepo.save(card);
    }
}

