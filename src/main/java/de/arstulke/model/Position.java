package de.arstulke.model;

import javax.persistence.Column;
import javax.persistence.Embeddable;

/**
 * Created Position.java in de.arstulke.model
 * by Arne on 03.03.2017.
 */
@Embeddable
public class Position {
    @Column(name = "cb_x")
    private int x;
    @Column(name = "cb_y")
    private int y;

    public Position(int x, int y) {
        this.x = x;
        this.y = y;
    }

    public Position() {
    }

    public int getX() {
        return x;
    }

    public int getY() {
        return y;
    }

    public void setX(int x) {
        this.x = x;
    }

    public void setY(int y) {
        this.y = y;
    }

    public boolean isNegative() {
        return x < 0 || y < 0;
    }

    public Position plus(Position offset) {
        return new Position(this.x + offset.x, this.y + offset.y);
    }

    @Override
    public String toString() {
        return "Position{" +
                "x=" + x +
                ", y=" + y +
                '}';
    }
}
