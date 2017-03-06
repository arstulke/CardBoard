import { ContextMenuComponent } from './context-menu/context-menu.component';

export class ComponentContainer {
    private contextMenu: ContextMenuComponent;

    public setMenu(contextMenu: ContextMenuComponent) {
        this.contextMenu = contextMenu;
    }

    public getMenu() {
        return this.contextMenu;
    }
}
