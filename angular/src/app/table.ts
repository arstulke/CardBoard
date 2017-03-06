const templateBuffer = {
    bottom: 0,
    right: 0,
    left: 0,
    top: 0
};
export class Table<type> {

    private width;
    private height;

    constructor(private table: any[][], private template, private buffer: any) {
        this.validateBuffer();
        this.insertBuffer();

        this.width = 0;
        this.height = table.length;
        this.table.forEach(row => {
            if (row.length > this.width) {
                this.width = row.length;
            }
        })

        this.table.map((row, y) => {
            for (let x = 0; x < this.width; x++) {
                if (row[x] === undefined || row[x] === null) {
                    row[x] = template(y, x, this.buffer);
                }
            }
            return row;
        });

        this.width -= buffer.left + buffer.right;
        this.height -= buffer.top + buffer.bottom;
    }

    public getRows(): any[][] {
        return this.table;
    }

    public getWidth(): Number {
        return this.width;
    }

    public getHeight(): Number {
        return this.height;
    }

    private insertBuffer() {
        for (let i = 0; i < this.buffer.top; i++) {
            this.table.unshift([]);
        }
        for (let i = 0; i < this.buffer.bottom; i++) {
            this.table.push([]);
        }
        for (let i = 0; i < this.table.length; i++) {
            if (this.table[i] === undefined) {
                this.table[i] = [];
            }
        }
        this.table.map((row, index) => {
            for (let i = 0; i < this.buffer.left; i++) {
                row.unshift(null);
            }
            for (let i = 0; i < this.buffer.right; i++) {
                row.push(null);
            }
        });
    }

    private validateBuffer() {
        if (this.buffer === undefined || this.buffer === null) {
            this.buffer = templateBuffer;
        } else if (this.buffer.right === undefined || this.buffer.right === null) {
            this.buffer.right = templateBuffer.right;
        } else if (this.buffer.left === undefined || this.buffer.left === null) {
            this.buffer.left = templateBuffer.left;
        } else if (this.buffer.top === undefined || this.buffer.top === null) {
            this.buffer.top = templateBuffer.top;
        } else if (this.buffer.bottom === undefined || this.buffer.bottom === null) {
            this.buffer.bottom = templateBuffer.bottom;
        }
    }
}
