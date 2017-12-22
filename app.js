(function () {
    "use strict";

    const Anipang = require('./anipang');

    const input = [
        [2, 4, 1, 2, 1],
        [3, 4, 2, 3, 3],
        [2, 4, 1, 2, 2],
        [4, 4, 4, 1, 2],
        [4, 2, 3, 3, 2]
    ];

    const anipang = new Anipang(input);
    anipang.startPang();
    anipang.printPang();
}());