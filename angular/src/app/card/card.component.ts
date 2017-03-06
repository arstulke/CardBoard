import { Component, Input } from '@angular/core';
import { Card } from '../card';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ["./card.component.css"]
})
export class CardComponent {
  @Input("data") private card: Card;

  private getStyle(): Object {
    let backgroundColor = this.card.getBackgroundColor();
    let textColor = this.card.getTextColor();
    if (textColor === null || backgroundColor === null) {
      return {};
    }
    else {
      return {
        backgroundColor: backgroundColor,
        color: textColor
      };
    }
  }

}
