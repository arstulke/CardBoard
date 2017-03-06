import { Directive, Input, HostListener, ElementRef } from '@angular/core';
import { ContextMenuComponent } from './context-menu.component';
import { ComponentContainer } from '../component-container';

@Directive({
  selector: '[context-menu]'
})
export class ContextMenuDirective {
  @Input("subject") private item;
  @Input("menu-options") private options;

  constructor(private instanceContainer: ComponentContainer, private elementRef: ElementRef) {
  }

  @HostListener("contextmenu", ["$event"])
  private contextMenu(event: any) {
    this.instanceContainer.getMenu().open(event, this.item, this.options);
  }

  @HostListener("mouseup", ["$event"])
  private default(event: any) {
    if (event.button === 1) {
      this.instanceContainer.getMenu().executeDefault(event, this.item, this.options);
    }
  }
}
