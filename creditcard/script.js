document.addEventListener("DOMContentLoaded", function() {
  const cardBtn = document.getElementById("card-btn");
  const cardSuccess = document.getElementById("card-success");
  const formErrors = document.getElementById("form-errors");

  cardBtn.addEventListener("click", function() {
    const cardNumber = document.getElementById("card-number").value;
    const cardCvc = document.getElementById("card-cvc").value;

    // Simple validation: card number must have 16 digits and CVC 3 or 4 digits
    if (cardNumber.length === 16 && (cardCvc.length === 3 || cardCvc.length === 4)) {
      cardSuccess.classList.remove("hidden");
      formErrors.classList.add("hidden");
    } else {
      formErrors.classList.remove("hidden");
      cardSuccess.classList.add("hidden");
    }
  });
});