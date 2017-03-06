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

    public Log() {
    }

    public Log(Date time, String text) {
        this.time = time;
        this.text = text;
    }

    public Log(String text) {
        this(new Date(), text);
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

    @Override
    public String toString() {
        return "Log{" +
                "id=" + id +
                ", time=" + time +
                ", text='" + text + '\'' +
                '}';
    }
}
