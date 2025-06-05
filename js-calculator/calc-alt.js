// takes non-standard calculator input
// returns answer
export function calculate(exp) {
    const results = [];
    const values = exp.split("");
    const operators = ["*", "/", "+", "-"];

    do {
        const val = values.pop();

        // if an operator
        if (operators.indexOf(val) > -1) {
            const a = parseInt(results.pop());
            const b = parseInt(results.pop());

            results.push(evaluate(val, a, b));
        } else {
            results.push(val);
        }
    } while (values.length > 0);

    return results.pop();
}

function evaluate(operator, left, right) {
    let result;

    switch (operator) {
        case "+":
            result = left + right;
            break;
        case "-":
            result = left - right;
            break;
        case "*":
            result = left * right;
            break;
        case "/":
            result = left / right;
            break;
        default:
            throw new Error("Unknown operator ${operator}");
    }

    return result;
}

const exp1 = "+34";
const exp2 = "-3*45";
const exp3 = "*+345";
const exp4 = "/-34+52";

console.log(calculate(exp1)); // 7
console.log(calculate(exp2)); // -17
console.log(calculate(exp3)); // 35
console.log(calculate(exp4)); // -0.14
