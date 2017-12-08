class Anipang {
    constructor(arr) {
        this.arr = arr;
        this.isCheck = false;
    }

    start() {
        this.checkPang();
    }
    pringPang() {
        console.log(this.arr);
    }
    transpose(arr) {
        return arr[0].map((col, i) => arr.map(row => row[i]));
    }
    checkPang() {
        this.isCheck = false;
        this.checkRow().checkCol().fillPang();
        if (this.isCheck) this.checkPang();
    }
    fillPang() {
        this.arr = this.transpose(this.transpose(this.arr).map((row) => {
            const newRow = row.filter(item => item !== 0);
            let length = newRow.length;
            while (length < 5) {
                newRow.unshift(0);
                length++;
            }
            return newRow;
        }));
        return this;
    }
    checkRow() {
        this.arr.forEach((row, i) => {
            row.forEach((v, j, rowArr) => {
                this.erase(v, j, rowArr);
            })
            return row;
        });
        return this;
    }
    checkCol() {
        this.arr = this.transpose(this.transpose(this.arr).map((col, i) => {
            col.forEach((v, j, colArr) => {
                this.erase(v, j, colArr);
            })
            return col;
        }));
        return this;
    }
    erase(v, j, Arr) {
        const restArr = Arr.slice(j + 1);
        let compareNum = restArr.shift();
        let pangCnt = 1;
        while (compareNum) {
            if (compareNum === v) {
                compareNum = restArr.shift();
                pangCnt++;
            } else {
                break;
            }
        }
        if (pangCnt >= 3) {
            Arr.splice(j, pangCnt, ...(new Array(pangCnt).fill(0)));
            this.isCheck = true;
        }
    }
}

module.exports = {
    Anipang
};