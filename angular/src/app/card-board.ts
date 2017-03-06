import { Card } from './card';
import { Table } from './table';

export class CardBoard {
    constructor(private id: Number, public name: String, private cards: Card[]) { }

    public getId(): Number {
        return this.id;
    }

    public getName(): String {
        return this.name;
    }

    public getCards(): Card[] {
        return this.cards;
    }

    public getTable(): Table<Card> {
        let table = [];
        this.cards.forEach(card => {
            if (table[card.getPosition().y] === undefined) {
                table[card.getPosition().y] = [];
            }
            table[card.getPosition().y][card.getPosition().x] = card;
        });
        return new Table<Card>(table, (y, x, buffer) => {
            return new Card(null, " ", { x: x - buffer.left, y: y - buffer.top }, null, null);
        }, {
            bottom: 1,
            right: 1,
            left: 1,
            top: 1
        });
    }
}
