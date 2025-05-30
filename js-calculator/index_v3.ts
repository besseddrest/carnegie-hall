class CalculatorV3 {
    private stack: string[];
    private queue: string[];
    private num: string;
    public lcd: HTMLInputElement | null = null;
    private justSolved: boolean;
    readonly operators: {
        [key: string]: number;
    } = {
        "^": 1,
        "*": 2,
        "/": 2,
        "+": 3,
        "-": 3,
    };
    constructor() {
        this.stack = [];
        this.queue = [];
        this.num = "";
        this.lcd = document.getElementById(
            "calc-lcd",
        ) as HTMLInputElement | null;
        this.justSolved = false;
    }

    solve() {
        this.flushNum();
        console.log("QUEUE: ", this.queue);
        console.log("STACK: ", this.stack);

        while (this.stack.length > 0) {
            this.queue.push(this.stack.pop()!);
        }

        const results: number[] = [];

        for (const item of this.queue) {
            if (!isNaN(parseFloat(item))) {
                results.push(parseFloat(item));
            } else {
                const right = results.pop()!;
                const left = results.pop()!;
                let result: number;

                switch (item) {
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
                    case "^":
                        result = left ** right;
                        break;
                    default:
                        throw new Error(`Unknown operator ${item}`);
                }

                results.push(result);
            }
        }

        const final = results.pop();

        if (this.lcd) this.lcd.value = final!.toString();

        this.justSolved = true;
        this.queue = [];
        this.stack = []; // to be sure
        return final;
    }

    handleInput(val: string) {
        if (this.justSolved) {
            this.handleNewInput(val);
        }

        switch (val) {
            case "clear":
                this.clearDisplay();
                break;
            case "=":
                this.solve();
                break;
            case ")":
                this.handleParens();
                break;
            case "(":
                this.updateDisplay(val);
                this.stack.push(val);
                break;
            default:
                this.handleValue(val);
                break;
        }
    }

    handleNewInput(val: string) {
        if (this.lcd) {
            console.log("last:", this.lcd.value);
            // just solved is true
            if (isNaN(parseInt(val))) {
                this.num = this.lcd.value;
            } else {
                this.lcd.value = "";
            }
            this.justSolved = false;
        }
    }

    updateDisplay(val: string) {
        if (this.lcd) this.lcd.value += val;
    }

    clearDisplay() {
        if (this.lcd) this.lcd.value = "";
        this.stack = [];
        this.queue = [];
        this.num = "";
    }

    flushNum() {
        if (this.num !== "") {
            this.queue.push(this.num);
            this.num = "";
        }
    }

    handleValue(val: string) {
        this.updateDisplay(val);

        // if this is a number
        if (!isNaN(parseInt(val)) || val === ".") {
            this.num += val;
        } else {
            // operator
            this.flushNum();
            this.handleOperator(val);
            this.stack.push(val);
        }
    }
    handleOperator(val: string): void {
        do {
            const head = this.stack.pop();

            if (!head) {
                break;
            }

            if (this.operators[head] < this.operators[val]) {
                this.queue.push(head);
            } else {
                this.stack.push(head);
                break;
            }
        } while (
            this.operators.hasOwnProperty(this.stack[this.stack.length - 1])
        );
    }

    handleParens() {
        this.flushNum();

        do {
            const head = this.stack.pop();
            if (head === "(") {
                break;
            } else {
                if (head) {
                    this.queue.push(head);
                }
            }
        } while (this.stack.length > 0);
    }
}
