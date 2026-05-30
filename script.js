let display = document.getElementById("display");
let historyList = document.getElementById("historyList");

function append(value) {
  if (display.value === "Error") display.value = "";
  display.value += value;
}

function clearDisplay() {
  display.value = "";
}

function deleteLast() {
  display.value = display.value.slice(0, -1);
}

function calculate() {
  try {
    let expression = display.value;

    // prevent invalid input
    if (!/^[0-9+\-*/.() ]+$/.test(expression)) {
      throw "Invalid Input";
    }

    let result = Function("return " + expression)();

    addToHistory(expression + " = " + result);
    display.value = result;

  } catch {
    display.value = "Error";
  }
}


document.addEventListener("keydown", function(event) {
  const key = event.key;

  if (/^[0-9]$/.test(key) || ['+', '-', '*', '/', '.'].includes(key)) {
    append(key);
  } else if (key === "Enter") {
    event.preventDefault(); 
    calculate();
  } else if (key === "Backspace") {
    deleteLast();
  } else if (key === "Escape") {
    clearDisplay();
  }
});

function addToHistory(entry) {
  let li = document.createElement("li");
  li.textContent = entry;

  li.onclick = function () {
    display.value = entry.split(" = ")[0];
  };

  historyList.prepend(li);
  saveHistory();
}

function saveHistory() {
  localStorage.setItem("calcHistory", historyList.innerHTML);
}

function loadHistory() {
  historyList.innerHTML = localStorage.getItem("calcHistory") || "";
}

function clearHistory() {
  historyList.innerHTML = "";
  localStorage.removeItem("calcHistory");
}

function toggleTheme() {
  document.body.classList.toggle("light");

  // save preference
  localStorage.setItem("theme", document.body.classList.contains("light") ? "light" : "dark");
}

// load theme on start
window.onload = function () {
  loadHistory();

  let savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    document.body.classList.add("light");
  }
};