const resultText = document.getElementsByClassName("result-text")[0];

// initialize monthly payment so that it can be changed
let mPayment;

document.addEventListener("DOMContentLoaded", function () {
  // Find the form element by its ID
  var form = document.getElementById("calc_entry");

  // submit listener
  form.addEventListener("submit", function (event) {
    // prevent default
    event.preventDefault();

    if (event.submitter && event.submitter.value === "Calculate") {
      // access form elements

      // main vars
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

      // log values
      console.log("Property Value:", propertyValue);
      console.log("Down Payment:", downPayment);
      console.log("Interest Rate:", rate);
      console.log("Term in Years:", termInYears);

      let principal = propertyValue - downPayment;
      console.log("Mortgage Principal:", principal);

      mPayment =
        (principal * (rate / 12)) /
        (1 - (1 + rate / 12) ** (-12 * termInYears));

      console.log(mPayment);
      console.log(mPayment.toFixed(2));
      resultText.innerHTML = "$" + `${mPayment.toFixed(2)}`;
    }
  });
});
