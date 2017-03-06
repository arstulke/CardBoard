package de.arstulke.model;

import javax.persistence.*;
import java.util.List;

/**
 * Created CardBoard.java in de.arstulke.model
 * by Arne on 03.03.2017.
 */
@Entity
public class CardBoard {

    @Id
    @GeneratedValue
    private Long id;

    @OneToMany(targetEntity = Card.class, cascade = CascadeType.ALL)
    private List<Card> cards;

    @Basic
    private String name;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public CardBoard(List<Card> cards, String name) {
        this(name);
        this.cards = cards;
    }

    public CardBoard(String name) {
        this();
        this.name = name;
    }

    public CardBoard() {
    }

    public List<Card> getCards() {
        return cards;
    }

    public void setCards(List<Card> cards) {
        this.cards = cards;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "CardBoard{" +
                "id=" + id +
                ", name='" + name + '\'' +
                '}';
    }
}
