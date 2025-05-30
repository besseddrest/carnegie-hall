class Calculator {
  constructor() {
    this.queue = [];
    this.numbers = [];
    this.isInner = false;
    this.inner = [];
    this.display = "";
    this.screen = document.getElementById("calc-display");
    this.operators = ["*", "/", "+", "-"];
  }

  commit(val) {
    if (this.isInner && val === ")") {
      this.queue.push(this.inner);
      this.inner = [];
      this.isInner = false;
      return;
    }
    const nums =
      this.inner.length > 0 ? this.inner.join("") : this.numbers.join();
    this.queue.push(nums);
    this.queue.push(val);
    this.numbers = [];
    this.inner = [];
    this.isInner = false;
  }

  handleInput(val) {
    if (this.operators.includes(val)) {
      this.commit(val);
    }

    if (val === "^") {
      this.isInner = true;
      handleExpo();
      return;
    }

    if (val === "(") {
      this.inner = true;
      return;
    }

    if (this.isInner) {
      this.inner.push(val);
    } else {
      this.numbers.push(val);
    }
  }

  handleExpo() {
    const nums = this.numbers.join("");
    this.inner.push(nums);
    this.inner.push("^");
  }
}
