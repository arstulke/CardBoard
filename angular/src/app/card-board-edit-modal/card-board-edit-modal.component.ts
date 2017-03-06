import { Component, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CardBoardService } from '../card-board.service';

@Component({
  selector: 'card-board-edit-modal',
  templateUrl: './card-board-edit-modal.component.html'
})
export class CardBoardEditModalComponent {

  @ViewChild('modal') private modalContent;
  private data;

  constructor(private modalService: NgbModal, private cardBoardService: CardBoardService) { }

  public open(item, label): Promise<never> {
    this.data = { model: item, title: label };
    return this.modalService.open(this.modalContent).result.then((result) => {
      if (result.getId !== undefined) {
        return this.cardBoardService.renameCardBoard(result.getId(), result.getName());
      } else {
        return this.cardBoardService.createCardBoard(result);
      }
    });
  }

  private checkSubmit(event: any, close, model) {
    if (event.key === "Enter") {
      close(model);
    }
  }
}
