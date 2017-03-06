package de.arstulke.controller;

import de.arstulke.model.Card;
import de.arstulke.model.CardBoard;
import de.arstulke.model.Position;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Created Util in de.arstulke.controller
 * by ARSTULKE on 06.03.2017.
 */
public class Util {
    public static void moveAll(Card card, CardBoard cardBoard) {
        if (card != null && card.getPosition().isNegative()) {
            int offsetX = card.getPosition().getX() * -1;
            int offsetY = card.getPosition().getY() * -1;
            offsetX = offsetX < 0 ? 0 : offsetX;
            offsetY = offsetY < 0 ? 0 : offsetY;

            Position offset = new Position(offsetX, offsetY);
            cardBoard.getCards().forEach(c -> c.setPosition(c.getPosition().plus(offset)));
        }

        List<Card> sameRow = cardBoard.getCards().stream()
                .filter(c -> c.getPosition().getY() == 0)
                .collect(Collectors.toList());
        while (sameRow.size() == 0 && cardBoard.getCards().size() > 0) {
            cardBoard.getCards().forEach(card1 -> card1.setPosition(card1.getPosition().plus(new Position(0, -1))));
            sameRow = cardBoard.getCards().stream()
                    .filter(c -> c.getPosition().getY() == 0)
                    .collect(Collectors.toList());
        }

        List<Card> sameColumn = cardBoard.getCards().stream()
                .filter(c -> c.getPosition().getX() == 0)
                .collect(Collectors.toList());
        while (sameColumn.size() == 0 && cardBoard.getCards().size() > 0) {
            cardBoard.getCards().forEach(card1 -> card1.setPosition(card1.getPosition().plus(new Position(-1, 0))));
            sameColumn = cardBoard.getCards().stream()
                    .filter(c -> c.getPosition().getX() == 0)
                    .collect(Collectors.toList());
        }
    }
}
