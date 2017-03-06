import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CardBoardService } from '../card-board.service';

@Component({
  selector: 'insert-modal',
  templateUrl: './card-insert-modal.component.html'
})
export class CardInsertModalComponent {

  @ViewChild('modal') private modalContent;
  private data;

  constructor(private modalService: NgbModal, private cardBoardService: CardBoardService) { }

  public open(item, label, cardBoard): Promise<never> {
    this.data = { model: item, title: label };
    return this.modalService.open(this.modalContent).result.then((result) => {
      if (item.getId() === null) {
        return this.cardBoardService.createCard(cardBoard.getId(), result.model);
      } else {
        return this.cardBoardService.updateCard(item.getId(), result.model);
      }
    }, (reason) => reason);
  }

  private checkSubmit(event: any, close, model) {
    if (event.key === "Enter") {
      close(model);
    }
  }

  private isValidColor(color): Boolean {
    if (color === undefined) return false;
    if (color === null) return false;
    if (color.length == 0) return false;
    if (!color.startsWith("#")) return false;
    return true;
  }
}
