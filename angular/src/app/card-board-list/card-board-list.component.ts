import { Component, ViewChild } from '@angular/core';
import { CardBoardService } from '../card-board.service';
import { CardBoard } from '../card-board';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CardBoardEditModalComponent } from '../card-board-edit-modal/card-board-edit-modal.component';

@Component({
  selector: 'app-card-board-list',
  templateUrl: './card-board-list.component.html',
  styleUrls: ['./card-board-list.component.css']
})
export class CardBoardListComponent {

  private menuOptions = [
    {
      label: "Löschen",
      execute: (event, item) => {
        this.cardBoardService.deleteCardBoard(item.getId())
        .then(response => this.refresh());
      }
    }, {
      default: true,
      label: "Umbennen",
      execute: (event, item) => {
        this.cardBoardEditModalComponent.open(item, event["label"])
          .then(response => this.refresh(), response => response);
      }
    }
  ];


  @ViewChild(CardBoardEditModalComponent) private cardBoardEditModalComponent;
  private cardboards: CardBoard[];
  private logs;

  constructor(private cardBoardService: CardBoardService) {
    this.refresh();
  }

  private refresh() {
    this.cardBoardService.getAll().then(response => this.cardboards = response);
    this.cardBoardService.getLogs().then(response => this.logs = response);
  }

  private create() {
    this.cardBoardEditModalComponent.open({name: " "}, "Erstellen")
      .then(response => this.refresh(), response => response);
  }

  private checkSubmit(event: any, close, model) {
    if (event.key === "Enter") {
      close(model);
    }
  }

  private getLog() {
    return this.logs.map(log => log.text).join("");
  }
}
