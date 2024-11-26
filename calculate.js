const resultText = document.getElementsByClassName("result-text")[0];
const totalFields = document.getElementsByClassName("total-text");
const totalInterest = totalFields[0];
const adjustedTotal = totalFields[1];

document.addEventListener("DOMContentLoaded", function () {
  // Find the form element by its ID
  const form = document.getElementById("calc_entry");

  // Submit listener
  form.addEventListener("submit", function (event) {
    // Prevent default
    event.preventDefault();

    if (event.submitter && event.submitter.value === "Calculate") {
      // Access form elements
      const propertyValue = parseFloat(
        document.getElementsByName("propvalue")[0].value
      );
      const downPayment = parseFloat(
        document.getElementsByName("dwnpayment")[0].value
      );
      const rate =
        parseFloat(document.getElementsByName("interest")[0].value) / 100;
      const termInYears = parseFloat(
        document.getElementsByName("term")[0].value
      );

      // Checks
      if (
        isNaN(propertyValue) ||
        isNaN(downPayment) ||
        isNaN(rate) ||
        isNaN(termInYears)
      ) {
        resultText.innerHTML = "Please enter valid numeric values.";
        totalInterest.innerHTML = "$0.00";
        adjustedTotal.innerHTML = "$0.00";
        return;
      }

      if (downPayment > propertyValue) {
        resultText.innerHTML = "Down payment cannot exceed property value.";
        totalInterest.innerHTML = "$0.00";
        adjustedTotal.innerHTML = "$0.00";
        return;
      }

      const principal = propertyValue - downPayment;
      const monthlyRate = rate / 12;
      const totalPayments = termInYears * 12;

      // Calculate Monthly Payment
      const mPayment =
        (principal * monthlyRate) /
        (1 - Math.pow(1 + monthlyRate, -totalPayments));

      // Calculate Total Interest and Adjusted Total
      const totalPayment = mPayment * totalPayments;
      const totalInterestAmount = totalPayment - principal;

      // Update Displayed Results
      resultText.innerHTML = `$${mPayment.toFixed(2)}`;
      totalInterest.innerHTML = `$${totalInterestAmount.toFixed(2)}`;
      adjustedTotal.innerHTML = `$${totalPayment.toFixed(2)}`;
    }
  });
});
