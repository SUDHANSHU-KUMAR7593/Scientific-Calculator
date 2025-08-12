let display = document.getElementById("display");
let angleMode = "DEG"; // DEG or RAD

function insert(value) {
  display.value += value;
}

function clearDisplay() {
  display.value = "";
}

function backspace() {
  display.value = display.value.slice(0, -1);
}

function factorial(n) {
  if (n < 0) return NaN;
  if (n === 0 || n === 1) return 1;
  return n * factorial(n - 1);
}

function degRadToggle() {
  angleMode = (angleMode === "DEG") ? "RAD" : "DEG";
  document.getElementById("degRadBtn").innerText = angleMode;
}

function calculate() {
  try {
    let expression = display.value;
    // Replace constants
    expression = expression.replace(/π/g, Math.PI);
    expression = expression.replace(/e/g, Math.E);

    // Factorials
    expression = expression.replace(/(\d+)!/g, (match, num) => factorial(parseInt(num)));

    // Handle ^ as power
    expression = expression.replace(/(\d+(\.\d+)?)\^(\d+(\.\d+)?)/g, (match, base, _, exp) => `Math.pow(${base},${exp})`);

    // Square root
    expression = expression.replace(/√\(/g, "Math.sqrt(");

    // Trigonometry
    expression = expression.replace(/sin\(/g, `Math.sin(${angleMode === "DEG" ? "Math.PI/180*" : ""}`);
    expression = expression.replace(/cos\(/g, `Math.cos(${angleMode === "DEG" ? "Math.PI/180*" : ""}`);
    expression = expression.replace(/tan\(/g, `Math.tan(${angleMode === "DEG" ? "Math.PI/180*" : ""}`);

    // Logs
    expression = expression.replace(/log\(/g, "Math.log10(");
    expression = expression.replace(/ln\(/g, "Math.log(");

    // Evaluate
    let result = eval(expression);

    if (isNaN(result) || !isFinite(result)) throw "Error";
    display.value = result;
  } catch (error) {
    display.value = "Error";
  }
}

// Keyboard support
document.addEventListener("keydown", function(event) {
  let key = event.key;
  if (!isNaN(key) || "+-*/().".includes(key)) {
    insert(key);
  } else if (key === "Enter") {
    calculate();
  } else if (key === "Backspace") {
    backspace();
  }
});
