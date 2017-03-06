package de.arstulke.model;

import javax.persistence.*;
import java.util.Date;

/**
 * Created Log.java in de.arstulke.model
 * by Arne on 05.03.2017.
 */
@Entity
public class Log {
    @Id
    @GeneratedValue
    private Long id;
    @Basic
    private Date time;

    @Basic
    @Column(length = 2000)
    private String text;

    @ManyToOne(targetEntity = CardBoard.class)
    private CardBoard cardBoard;

    public Log() {
    }

    public Log(Date time, String text, CardBoard cardBoard) {
        this.time = time;
        this.text = text;
        this.cardBoard = cardBoard;
    }

    public Log(String text, CardBoard cardBoard) {
        this(new Date(), text, cardBoard);
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getTime() {
        return time;
    }

    public void setTime(Date time) {
        this.time = time;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public CardBoard getCardBoard() {
        return cardBoard;
    }

    public void setCardBoard(CardBoard cardBoard) {
        this.cardBoard = cardBoard;
    }

    @Override
    public String toString() {
        return "Log{" +
                "id=" + id +
                ", time=" + time +
                ", text='" + text + '\'' +
                '}';
    }
}
