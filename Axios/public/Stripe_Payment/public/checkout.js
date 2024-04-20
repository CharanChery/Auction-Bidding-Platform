// This is your test publishable API key.

const stripe = Stripe(
  "pk_test_51P40OQSGD6nuXoPYKthxbkgj8Byf9doruezzc0KLr5XqEMtppbMkCYzOO3CDy0aTqeZxuuj6fpGDgyQebe0as9YL00mX9E2Sai"
);

// The items the customer wants to buy
// const items = [{ id: "xl-tshirt" }];
const items = [{ id: "xl-tshirt", price: 25000 }]; // Example price: $25

let elements;
let t_id;

initialize();
checkStatus();

document
  .querySelector("#payment-form")
  .addEventListener("submit", handleSubmit);

// Fetches a payment intent and captures the client secret
async function initialize() {
  const response = await fetch("/create-payment-intent", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items }),
  });
  const { clientSecret } = await response.json();

  elements = stripe.elements({ clientSecret }); // Pass the clientSecret parameter here

  const paymentElementOptions = {
    // Configure your payment element options here if needed
  };

  const paymentElement = elements.create("payment", paymentElementOptions);
  paymentElement.mount("#payment-element");
}

async function handleSubmit(e) {
  e.preventDefault();
  setLoading(true);

  const { error } = await stripe.confirmPayment({
    elements,
    confirmParams: {
      // Make sure to change this to your payment completion page
      return_url: "http://localhost:4242/checkout.html",
    },
  });

  if (error) {
    showMessage(error.message);
  } else {
    showMessage("Payment succeeded! Payment Intent ID: ${paymentIntent.id}");
    t_id = paymentIntent.id;
    console.log("Transaction Id:", t_id);
  }

  setLoading(false);
}

// Fetches the payment intent status after payment submission
async function checkStatus() {
  const clientSecret = new URLSearchParams(window.location.search).get(
    "payment_intent_client_secret"
  );

  if (!clientSecret) {
    return;
  }

  const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);

  switch (paymentIntent.status) {
    case "succeeded":
      showMessage("Payment succeeded!");
      break;
    case "processing":
      showMessage("Your payment is processing.");
      break;
    case "requires_payment_method":
      showMessage("Your payment was not successful, please try again.");
      break;
    default:
      showMessage("Something went wrong.");
      break;
  }
}

// ------- UI helpers -------

function showMessage(messageText) {
  const messageContainer = document.querySelector("#payment-message");

  messageContainer.classList.remove("hidden");
  messageContainer.textContent = messageText;

  setTimeout(function () {
    messageContainer.classList.add("hidden");
    messageContainer.textContent = "";
  }, 8000);
}

// Show a spinner on payment submission
function setLoading(isLoading) {
  const spinner = document.querySelector("#spinner");
  const buttonText = document.querySelector("#button-text");

  if (isLoading) {
    // Disable the button and show a spinner
    document.querySelector("#submit").disabled = true;
    spinner.classList.remove("hidden");
    buttonText.classList.add("hidden");
  } else {
    document.querySelector("#submit").disabled = false;
    spinner.classList.add("hidden");
    buttonText.classList.remove("hidden");
  }
}
