import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';


import { AppComponent } from './app.component';
import { ContextMenuComponent } from './context-menu/context-menu.component';
import { ContextMenuDirective } from './context-menu/context-menu.directive';
import { CardBoardListComponent } from './card-board-list/card-board-list.component';
import { CardBoardViewComponent } from './card-board-view/card-board-view.component';

import { CardBoardService } from './card-board.service';
import { Service } from './service';
import { CardInsertModalComponent } from './card-insert-modal/card-insert-modal.component';
import { CardComponent } from './card/card.component';
import { DraggableDirective } from './context-menu/draggable.directive';
import { CardBoardEditModalComponent } from './card-board-edit-modal/card-board-edit-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    ContextMenuComponent,
    ContextMenuDirective,
    CardBoardViewComponent,
    CardBoardListComponent,
    CardInsertModalComponent,
    CardInsertModalComponent,
    CardComponent,
    DraggableDirective,
    CardBoardEditModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    RouterModule.forRoot([
      {
        path: "cardBoard/:id",
        component: CardBoardViewComponent
      },
      {
        path: "",
        component: CardBoardListComponent,
        pathMatch: "full"
      }
    ])
  ],
  providers: [
    Service,
    CardBoardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
