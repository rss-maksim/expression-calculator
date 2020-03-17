function eval() {
    // Do not use eval!!!
    return;
}

const ops = {
    add: '+',
    sub: '-',
    div: '/',
    mult: '*'
};

function expressionCalculator(expr) {
    const order = [[[ops.mult], [ops.div]], [[ops.add], [ops.sub]]];

    expr = expr.replace(/[^0-9%^*\/()\-+.]/g, '');
    console.log(expr);

    let output;
    for (let i = 0, n = order.length; i < n; i++) {

        // Regular Expression to look for operators between floating numbers or integers
        let re = new RegExp('(\\d+\\.?\\d*)([\\' + order[i].join('\\') + '])(\\d+\\.?\\d*)');
        re.lastIndex = 0; // take precautions and reset re starting pos

        // Loop while there is still calculation for level of precedence
        while (re.test(expr)) {
            output = calc(RegExp.$1, RegExp.$2, RegExp.$3);
            if (isNaN(output) || !isFinite(output)) {
                return output;
            }
            expr = expr.replace(re, output);
        }
    }

    return output;
}

function calc(a, operation, b) {
    a = a * 1;
    b = b * 1;
    switch (operation) {
        case ops.add:
            return a + b;
        case ops.sub:
            return a - b;
        case ops.div:
            if (b === 0) {
                throw new Error("TypeError: Division by zero.");
            }
            return a / b;
        case ops.mult:
            return a * b;
        default:
            return null;
    }
}

module.exports = {
    expressionCalculator
};
