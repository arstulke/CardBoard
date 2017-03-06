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
    while(cardBoard.name.startsWith(" ")) {
      cardBoard.name = cardBoard.name.substring(1, cardBoard.name.length);
    }
    while(cardBoard.name.endsWith(" ")) {
      cardBoard.name = cardBoard.name.substring(0, cardBoard.name.length - 1);
    }
    return this.service.post("/card-board", cardBoard).then(Converter.jsonToCardBoard);
  }

  public deleteCardBoard(id: Number): Promise<never> {
    return this.service.delete("/card-board/" + id);
  }

  public renameCardBoard(id: Number, name: String): Promise<CardBoard> {
    while(name.startsWith(" ")) {
      name = name.substring(1, name.length);
    }
    while(name.endsWith(" ")) {
      name = name.substring(0, name.length - 1);
    }
    console.log(name);
    return this.service.put("/card-board/" + id + "/name", name).then(Converter.jsonToCardBoard);
  }

  public createCard(id: Number, card: Card): Promise<Card> {
    while(card.text.startsWith(" ")) {
      card.text = card.text.substring(1, card.text.length);
    }
    while(card.text.endsWith(" ")) {
      card.text = card.text.substring(0, card.text.length - 1);
    }
    return this.service.put("/card-board/" + id + "/card", card).then(Converter.jsonToCard);
  }

  public deleteCard(id: Number): Promise<never> {
    return this.service.delete("/card/" + id);
  }

  public updateCard(id: Number, newCard: Card): Promise<Card> {
    while(newCard.text.startsWith(" ")) {
      newCard.text = newCard.text.substring(1, newCard.text.length);
    }
    while(newCard.text.endsWith(" ")) {
      newCard.text = newCard.text.substring(0, newCard.text.length - 1);
    }
    return this.service.put("/card/" + id, newCard).then(Converter.jsonToCard);
  }
  public updateCardPosition(card: Card, newPosition: Object): Promise<Card> {
    if (card.getId() !== null) {
      return this.service.put("/card/" + card.getId() + "/position", newPosition);
    } else {
      return Promise.resolve(null);
    }
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
