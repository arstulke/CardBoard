export class Card {
    constructor(private id: Number, public text: String, private position, public backgroundColor: String, public textColor: String) { }

    public getId(): Number {
        return this.id;
    }

    public getText(): String {
        return this.text;
    }

    public getPosition() {
        return this.position;
    }

    public getBackgroundColor(): String {
        return this.backgroundColor;
    }

    public getTextColor(): String {
        return this.textColor;
    }
}
