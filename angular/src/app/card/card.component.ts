import { Component, Input } from '@angular/core';
import { Card } from '../card';
import { DraggableDirective } from '../context-menu/draggable.directive';

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

    let style = {};
    if (textColor !== null && backgroundColor !== null) {
      Object.assign(style, {
        backgroundColor: backgroundColor,
        color: textColor
      });
    }
    if (DraggableDirective.isDragged) {
      Object.assign(style, {
        borderColor: "#ffb032"
      });
    }
    return style;
  }
}
