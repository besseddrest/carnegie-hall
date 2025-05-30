var Calculator = /** @class */ (function () {
    function Calculator() {
        this.operators = ["*", "/", "+", "-", "^"];
        this.lcd = null;
        this.queue = [];
        this.num = "";
        this.lcd = document.getElementById("calc-lcd");
        this.display = "";
        console.log("LCD element found:", this.lcd); // shows input element
    }
    Calculator.prototype.handleInput = function (val) {
        if (val === "=") {
            this.queue.push(this.num);
            this.num = "";
            this.solve();
            return;
        }
        if (this.lcd && val !== "clear") {
            this.lcd.value += val;
        }
        if (val === "(" || val === ")") {
            this.queue.push(val);
            return;
        }
        if (this.operators.indexOf(val) > -1) {
            console.log("Value: ".concat(val));
            this.queue.push(this.num, val);
            this.num = "";
            return;
        }
        this.num += val;
        console.log("Value: ".concat(val));
    };
    Calculator.prototype.solve = function () {
        console.log("Queue: ".concat(this.queue));
        console.log("Nums: ".concat(this.num));
    };
    Calculator.prototype.clearDisplay = function () {
        this.display = "";
        this.num = "";
        this.queue = [];
        if (this.lcd) {
            this.lcd.value = "";
        }
    };
    return Calculator;
}());
window.Calculator = Calculator;
