import { Util } from '../util';
import { CardBoard } from '../card-board';
import { ActivatedRoute } from '@angular/router';
import { CardBoardService } from '../card-board.service';
import { CardInsertModalComponent } from '../card-insert-modal/card-insert-modal.component';
import { Component, ViewChild, TemplateRef } from '@angular/core';
import { NgbModal, NgbModalRef, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'card-board-view',
  templateUrl: './card-board-view.component.html'
})
export class CardBoardViewComponent {
  private menuOptions = [
    {
      disable: (item) => !this.isValid(item),
      label: "Kopieren",
      execute: (event, item) => {
        Util.copyTextToClipboard(item.text);
      }
    }, {
      default: true,
      label: (item) => !this.isValid(item) ? "Einfügen" : "Bearbeiten",
      execute: (event, item) => {
        this.cardInsertModalComponent.open(item, event["label"], this.cardBoard)
          .then(response => this.refresh());
      }
    }, {
      disable: (item) => !this.isValid(item),
      label: "Löschen",
      execute: (event, item) => this.cardBoardService.deleteCard(item.getId())
        .then(response => this.refresh())
    }
  ];
  private logs;

  private cardBoard: CardBoard;

  constructor(private activatedRoute: ActivatedRoute, private cardBoardService: CardBoardService) {
    this.refresh();
  }

  private refresh() {
    this.activatedRoute.params.subscribe(params => {
      this.cardBoardService.get(params["id"]).then(response => this.cardBoard = response);
      this.cardBoardService.getLog(params["id"]).then(response => this.logs = response);
    });
  }

  @ViewChild("insertModal") private cardInsertModalComponent: CardInsertModalComponent;

  private isValid(item) {
    if (item === undefined) return false;
    if (item === null) return false;
    if (item.getText() === null) return false;
    if (item.getText() === undefined) return false;
    if (item.getText().length == 0) return false;

    return true;
  }

  private onswap(event: any) {
    if (event.itemA !== event.itemB) {
      this.cardBoardService.updateCardPosition(event.itemA, event.itemB.getPosition())
        .then(response => {
          this.cardBoardService.updateCardPosition(event.itemB, event.itemA.getPosition())
            .then(response => this.refresh())
        });
    }
  }

  private getLog() {
    return this.logs.map(log => log.text).join("");
  }
}
