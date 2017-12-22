module.exports = class Anipang {
    constructor(arr) {
        this.arr = JSON.parse(JSON.stringify(arr));
        this.rowLength = arr.length;
        this.isCheck = false;
    }

    startPang() {
        this.checkPang();
    }

    checkPang() {
        this.isCheck = false;
        this.checkRow().checkCol().arrangePang();
        if (this.isCheck) this.checkPang();
    }

    printPang() {
        console.log(this.arr);
    }

    transpose(arr) {
        return arr[0].map((col, i) => arr.map(row => row[i]));
    }

    arrangePang() {
        this.arr = this.transpose(this.transpose(this.arr).map(row => {
            const newRow = row.filter(item => item !== 0);
            let newRowLength = newRow.length;
            while (newRowLength < this.rowLength) {
                newRow.unshift(0);
                newRowLength++;
            }
            return newRow;
        }));
        return this;
    }

    checkRow() {
        this.arr = this.arr.map(row => {
            row.forEach((v, i, rowArr) => this.erasePang(v, i, rowArr));
            return row;
        });
        return this;
    }

    checkCol() {
        this.arr = this.transpose(this.transpose(this.arr).map(col => {
            col.forEach((v, i, colArr) => this.erasePang(v, i, colArr));
            return col;
        }));
        return this;
    }

    erasePang(v, i, Arr) {
        let pangCnt = 1;
        Arr.slice(i + 1).some(compareNum => {
            if (compareNum === v && v !== 0) pangCnt++;
            return compareNum !== v;
        })
        if (pangCnt >= 3) {
            Arr.splice(i, pangCnt, ...(Array(pangCnt).fill(0)));
            this.isCheck = true;
        }
    }
}