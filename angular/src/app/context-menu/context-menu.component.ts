import { Component, Directive, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'context-menu',
  templateUrl: './context-menu.component.html'
})
export class ContextMenuComponent {

  constructor(private elementRef: ElementRef) {
    this.update();
  }

  private visible: Boolean = false;
  private position: Object = {};
  private menuOptions = [];
  private item;

  public close() {
    this.visible = false;
    this.update();
  }

  public executeDefault(event: any, item: any, menuOptions: Object[]) {
    event.preventDefault();

    this.prepare(item, menuOptions);
    let menuOption = this.menuOptions.filter(menuOption => menuOption.default).pop();
    this.execute(menuOption, this.item);
  }

  public open(event: any, item: any, menuOptions: Object[]) {
    event.preventDefault();

    this.prepare(item, menuOptions);

    this.position = { x: event.pageX, y: event.pageY };
    this.setVisible(true);
    this.update();
  }

  public getClasses(menuOption) {
    return (menuOption !== null ? ('dropdown-item' + (menuOption['disable'] ? ' disabled' : '')) : 'dropdown-divider');
  }

  public execute(menuOption, item) {
    if (!menuOption['disable']) {
      setTimeout(function () {
        menuOption['execute'](menuOption, item);
      }, 0);
      this.close();
    }
  }

  public setVisible(visible: Boolean) {
    this.visible = visible;
  }

  public update() {
    let element = this.elementRef.nativeElement;
    element.style.display = this.visible ? "block" : "none";
    if (this.visible) {
      element = element.children[0].children[0];
      element.style.left = this.position["x"] + "px";
      element.style.top = this.position["y"] + "px";
    }
  }

  private prepare(item, menuOptions) {
    this.item = item;
    this.menuOptions = menuOptions.filter(menuItem => {
      return menuItem === null || (menuItem !== undefined && menuItem["label"] !== undefined && (menuItem["visible"] === undefined || menuItem["visible"](item)));
    }).map(menuItem => {
      if (menuItem === null) {
        return null;
      }
      let newMenuItem = {};
      Object.assign(newMenuItem, menuItem);
      if (typeof menuItem["label"] === "function") {
        newMenuItem["label"] = menuItem["label"](item);
      }
      if (menuItem["disable"] === undefined || typeof menuItem["disable"] !== "function") {
        newMenuItem["disable"] = false;
      } else {
        newMenuItem["disable"] = menuItem["disable"](item);
      }
      return newMenuItem;
    });

    while (this.menuOptions[0] === null) {
      this.menuOptions = this.menuOptions.slice(1, this.menuOptions.length);
    }

    while (this.menuOptions[this.menuOptions.length - 1] === null) {
      this.menuOptions.pop();
    }
  }
}