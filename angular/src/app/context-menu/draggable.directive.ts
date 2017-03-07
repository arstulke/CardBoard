import { Directive, HostListener, Input, EventEmitter, Output } from '@angular/core';
import { ComponentContainer } from '../component-container';

@Directive({
  selector: '[draggable]'
})
export class DraggableDirective {

  @Input("subject") private item;
  @Input("isItemValid") private isValid;
  @Input("menu-options") private menuOptions;
  @Output("onswap") private onswap = new EventEmitter();

  private static dragItem;
  public static isDragged: Boolean = false;

  constructor(private instanceContainer: ComponentContainer) { }

  @HostListener("mousedown", ["$event"])
  private onDrag(event: any) {
    this.instanceContainer.getMenu().close();
    if (event.button === 0 && this.isValid(this.item)) {
      DraggableDirective.dragItem = this.item;
      DraggableDirective.isDragged = true;
    } else if (event.button === 1) {
      this.instanceContainer.getMenu().executeDefault(event, this.item, this.menuOptions);
    }
  }

  @HostListener("mouseup", ["$event"])
  private onDrop(event: any) {
    if (event.button === 0 && this.isValid(DraggableDirective.dragItem)) {
      this.onswap.emit({ itemA: DraggableDirective.dragItem, itemB: this.item });
      DraggableDirective.isDragged = false;
      DraggableDirective.dragItem = null;
    }
  }
}
