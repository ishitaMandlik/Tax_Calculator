// script.js
function calculateTax() {
  var income = parseFloat(document.getElementById("income").value) || 0;
  var extraIncome = parseFloat(document.getElementById("extraIncome").value) || 0;
  var deductions = parseFloat(document.getElementById("deductions").value) || 0;
  var overallIncome = 0;
  var taxAmount = 0;

  var ageSelect = document.getElementById("age");
  var age = ageSelect.options[ageSelect.selectedIndex].value;

  if (income <= 0 || isNaN(income)) {
    showErrorTooltip("incomeErrorIcon", "Please enter a valid gross annual income.");
    return;
  }
  if (extraIncome < 0 || isNaN(extraIncome)) {
    showErrorTooltip("extraIncomeError", "Please enter a valid extra income.");
    return;
  }
  if (age === "Select") {
    showErrorTooltip("ageError", "Please select an age group.");
    return;
  }
  if (deductions < 0 || isNaN(deductions)) {
    showErrorTooltip("deductionsError", "Please enter a valid deductions amount.");
    return;
  }

function showErrorTooltip(errorIconId, errorMessage) {
  var errorIcon = document.getElementById(errorIconId);
  var tooltip = errorIcon.nextElementSibling; 
  if (!tooltip || tooltip.className !== "tooltip") { 
    tooltip = document.createElement("span");
    tooltip.className = "tooltip";
    errorIcon.parentNode.insertBefore(tooltip, errorIcon.nextSibling);
  }
  tooltip.textContent = errorMessage; 
  errorIcon.style.display = "inline"; 
  setTimeout(function() {
    errorIcon.style.display = "none"; 
    tooltip.textContent = "";
  }, 3000);
}

  var totalIncome = income + extraIncome;
  var taxableIncome = totalIncome - deductions;

  if (taxableIncome > 800000) {
    if (age === "<40") {
      taxAmount = 0.3 * (taxableIncome - 800000);
    } else if (age === "≥ 40 & < 60") {
      taxAmount = 0.4 * (taxableIncome - 800000);
    } else if (age === "≥ 60") {
      taxAmount = 0.1 * (taxableIncome - 800000);
    }
  }
  overallIncome = taxableIncome - taxAmount;
  sessionStorage.setItem("overallIncome", overallIncome.toFixed(2));
  window.location.href = "display.html";
}
