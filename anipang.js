module.exports = class Anipang {
    constructor(arr) {
        this.arr = JSON.parse(JSON.stringify(arr));
        this.length = arr.length;
        this.isCheck = false;
    }

    startPang() {
        this.checkPang();
    }
    printPang() {
        console.log(this.arr);
    }
    transpose(arr) {
        return arr[0].map((col, i) => arr.map(row => row[i]));
    }
    checkPang() {
        this.isCheck = false;
        this.checkRow().checkCol().arrangePang();
        if (this.isCheck) this.checkPang();
    }
    arrangePang() {
        this.arr = this.transpose(this.transpose(this.arr).map(row => {
            const newRow = row.filter(item => item !== 0);
            let length = newRow.length;
            while (length < this.length) {
                newRow.unshift(0);
                length++;
            }
            return newRow;
        }));
        return this;
    }
    checkRow() {
        this.arr = this.arr.map(row => {
            row.forEach((v, j, rowArr) => this.erasePang(v, j, rowArr));
            return row;
        });
        return this;
    }
    checkCol() {
        this.arr = this.transpose(this.transpose(this.arr).map(col => {
            col.forEach((v, j, colArr) => this.erasePang(v, j, colArr));
            return col;
        }));
        return this;
    }
    erasePang(v, j, Arr) {
        let pangCnt = 1;
        Arr.slice(j + 1).some(compareNum => {
            if (compareNum === v && v !== 0) pangCnt++;
            return compareNum !== v;
        })
        if (pangCnt >= 3) {
            Arr.splice(j, pangCnt, ...(new Array(pangCnt).fill(0)));
            this.isCheck = true;
        }
    }
}