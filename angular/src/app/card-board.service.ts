import { Card } from './card';
import { Service } from './service';
import { CardBoard } from './card-board';
import { Injectable } from '@angular/core';

@Injectable()
export class CardBoardService {

  constructor(private service: Service) { }

  public getLogs(): Promise<Object[]> {
    return this.service.get("/log");
  }

  public getLog(id: Number): Promise<Object[]> {
    return this.service.get("/log/" + id);
  }

  public getAll(): Promise<CardBoard[]> {
    return this.service.get("/card-board")
      .then(response => response.map(Converter.jsonToCardBoard).sort((a, b) => a.getCards().length - b.getCards().length));
  }

  public get(id: Number): Promise<CardBoard> {
    return this.service.get("/card-board/" + id)
      .then(Converter.jsonToCardBoard);
  }

  public createCardBoard(cardBoard): Promise<CardBoard> {
    cardBoard.name = this.removeWhitespaces(cardBoard.name);
    return this.service.post("/card-board", cardBoard).then(Converter.jsonToCardBoard);
  }

  public deleteCardBoard(id: Number): Promise<never> {
    return this.service.delete("/card-board/" + id);
  }

  public renameCardBoard(id: Number, name: String): Promise<CardBoard> {
    name = this.removeWhitespaces(name);
    return this.service.put("/card-board/" + id + "/name", name).then(Converter.jsonToCardBoard);
  }

  public createCard(id: Number, card: Card): Promise<Card> {
    card.text = this.removeWhitespaces(card.text);
    return this.service.put("/card-board/" + id + "/card", card).then(Converter.jsonToCard);
  }

  public deleteCard(id: Number): Promise<never> {
    return this.service.delete("/card/" + id);
  }

  public updateCard(id: Number, newCard: Card): Promise<Card> {
    newCard.text = this.removeWhitespaces(newCard.text);
    return this.service.put("/card/" + id, newCard).then(Converter.jsonToCard);
  }
  public updateCardPosition(card: Card, newPosition: Object): Promise<Card> {
    if (card.getId() !== null) {
      return this.service.put("/card/" + card.getId() + "/position", newPosition);
    } else {
      return Promise.resolve(null);
    }
  }

  private removeWhitespaces(name): String {
    if(name !== null) {
      while(name.startsWith(" ")) {
        name = name.substring(1, name.length);
      }
      while(name.endsWith(" ")) {
        name = name.substring(0, name.length - 1);
      }
    }
    return name;
  }
}

class Converter {
  public static jsonToCard(card) {
    if (card.backgroundColor === null) {
      card.backgroundColor = "#00ff00";
    }
    if (card.textColor === null) {
      card.textColor = "#000000";
    }
    return new Card(card.id, card.text, card.position, card.backgroundColor, card.textColor);
  }

  public static jsonToCardBoard(cardBoard: any) {
    return new CardBoard(cardBoard.id, cardBoard.name, cardBoard.cards.map(Converter.jsonToCard));
  }
}
