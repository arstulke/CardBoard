import { Component, ViewChild, OnInit } from '@angular/core';
import { ContextMenuComponent } from './context-menu/context-menu.component';
import { ComponentContainer } from './component-container';

let contextMenu = new ComponentContainer();
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [{
    provide: ComponentContainer,
    useValue: contextMenu
  }]
})
export class AppComponent implements OnInit {
  @ViewChild(ContextMenuComponent) menu: ContextMenuComponent;

  ngOnInit() {
    contextMenu.setMenu(this.menu);
  }
}