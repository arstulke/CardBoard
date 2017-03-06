package de.arstulke;

import de.arstulke.controller.CardBoardController;
import de.arstulke.model.Card;
import de.arstulke.model.CardBoard;
import de.arstulke.model.Position;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import javax.annotation.PostConstruct;

@SpringBootApplication
public class TaskboardApplication {

    public static void main(String[] args) {
        SpringApplication.run(TaskboardApplication.class, args);
    }

    @Autowired
    private CardBoardController cardBoardController;

    @PostConstruct
    private void postConstruct() {
        CardBoard cardBoard = cardBoardController.createCardBoard(new CardBoard("Test Taskboard"));

        cardBoardController.createCard(new Card("Register", new Position(0, 0)), cardBoard.getId());
        cardBoardController.createCard(new Card("Test1", new Position(0, 1)), cardBoard.getId());
        cardBoardController.createCard(new Card("Test2", new Position(1, 1)), cardBoard.getId());
        cardBoardController.createCard(new Card("Test3", new Position(0, 3)), cardBoard.getId());
        cardBoardController.createCard(new Card("Test4", new Position(1, 3)), cardBoard.getId());

        cardBoardController.createCard(new Card("Login", new Position(2, 0)), cardBoard.getId());
        cardBoardController.createCard(new Card("Test5", new Position(2, 1)), cardBoard.getId());
        cardBoardController.createCard(new Card("Test6", new Position(2, 2)), cardBoard.getId());
        cardBoardController.createCard(new Card("Test7", new Position(3, 2)), cardBoard.getId());

        cardBoardController.createCard(new Card("Test8", new Position(0, 4)), cardBoard.getId());
    }
}
