package de.arstulke.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.time.LocalDateTime;

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
    private LocalDateTime time;

    @Basic
    @Column(length = 2000)
    private String text;

    @ManyToOne(targetEntity = CardBoard.class)
    private CardBoard cardBoard;

    public Log() {
    }

    public Log(String text, CardBoard cardBoard) {
        this.time = LocalDateTime.now();
        this.text = text;
        this.cardBoard = cardBoard;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getTime() {
        return time;
    }

    public void setTime(LocalDateTime time) {
        this.time = time;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    @JsonIgnore
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
