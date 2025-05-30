class Calculator {
  public display: string; // shown to user
  private queue: string[]; // calculated at end
  private num: string; // handles numbers over 9
  readonly operators: string[] = ["*", "/", "+", "-", "^"];
  public lcd: HTMLInputElement | null = null;

  constructor() {
    this.queue = [];
    this.num = "";
    this.lcd = document.getElementById("calc-lcd") as HTMLInputElement | null;
    this.display = "";
    console.log("LCD element found:", this.lcd); // shows input element
  }

  handleInput(val: string): void {
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
      console.log(`Value: ${val}`);
      this.queue.push(this.num, val);
      this.num = "";
      return;
    }

    this.num += val;

    console.log(`Value: ${val}`);
  }

  solve(): void {
    console.log(`Queue: ${this.queue}`);
    console.log(`Nums: ${this.num}`);
  }

  clearDisplay() {
    this.display = "";
    this.num = "";
    this.queue = [];
    if (this.lcd) {
      this.lcd.value = "";
    }
  }
}
(window as any).Calculator = Calculator;
