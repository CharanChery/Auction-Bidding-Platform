document.addEventListener("DOMContentLoaded", () => {
  // This is your test publishable API key.
  const stripe = Stripe(
    "pk_test_51P40OQSGD6nuXoPYKthxbkgj8Byf9doruezzc0KLr5XqEMtppbMkCYzOO3CDy0aTqeZxuuj6fpGDgyQebe0as9YL00mX9E2Sai"
  );

  // The items the customer wants to buy
  // const items = [{ id: "xl-tshirt" }];
  //const items = [{ id: "xl-tshirt", price: 23456 }]; // Example price: $25
  
  let elements;
  let t_id;
  let amount;
  let urlusername;
  
  // initialize();
  //checkStatus();
  checkFormData();
  
  document
  .querySelector("#payment-form")
  .addEventListener("submit", handleSubmit);
  
  
  document.getElementById("ok").addEventListener("click", function(event) {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
       urlusername = urlParams.get('username');
      localStorage.setItem("urlusername", urlusername);
      //console.log("username== ",localStorage.getItem("urlusername"))



      // Prevent default button click behavior
      const amountInput = document.getElementById("amount");
      amount = parseInt(amountInput.value.trim());
      localStorage.setItem("amount", amount);
      event.preventDefault();
      initialize();
    });

  // Fetches a payment intent and captures the client secret
  async function initialize() {
    // Retrieve the amount entered by the user
    const amountInput = document.getElementById("amount");
    amount = parseInt(amountInput.value.trim());

    if (isNaN(amount)) {
      console.error("Invalid amount entered.");
      return;
    }

    console.log("Numerical value:", amount);

    const response = await fetch("/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ id: "xl-tshirt", price: amount }] }), // Include the parsedAmount in the items array
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

    //window.location.href =fullurl

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:5501/Stripe_Payment/done.html",
      },

    });

    if (error) {
      showMessage(error.message);
    } else {
      // After confirming the payment
      //localStorage.setItem("paymentData", JSON.stringify({ paymentIntentId: paymentIntent.id, urlusername, amount }));
      // localStorage.setItem("paymentData", JSON.stringify({ 
      //   paymentIntentId: paymentIntent.id, 
      //   urlusername: urlusername, 
      //   amount: amount 
      // }));
      // Redirect to done.html
      window.location.href = "http://localhost:5501/Stripe_Payment/done.html";
      //http://localhost:5501/Stripe_Payment/done.html?payment_intent=pi_3P8XJ3SGD6nuXoPY00U6iXba&payment_intent_client_secret=pi_3P8XJ3SGD6nuXoPY00U6iXba_secret_vHq1eN6Bi2sQeP9PRuZCDiLSO&redirect_status=succeeded
    // Redirect after a delay
    // setTimeout(() => {
    //   window.location.href = "http://localhost:5501/Stripe_Payment/done.html";
    // }, 3000); // Redirect after 3 seconds (adjust the delay as needed)

      // sessionStorage.setItem("paymentData", JSON.stringify({ 
      //   paymentIntentId: paymentIntent.id,
      //   urlusername: urlusername,
      //   amount: amount
      // }));
      
    }
    setLoading(false);
  }

  function checkFormData() {
    // Check if form data is already filled
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const urlusername = urlParams.get('username');
    
    const amountInput = document.getElementById("amount");
    const amountValue = amountInput.value.trim();
    console.log("urlusername:", urlusername);
    console.log("amountValue:", amountValue);

    if (urlusername && amountValue) {
        // Store form data in localStorage
        localStorage.setItem("paymentData", JSON.stringify({ 
            urlusername: urlusername, 
            amount: amountValue 
        }));
        console.log("Form data stored in localStorage:", localStorage.getItem("paymentData"));
    } else {
        console.log("Form data is not complete. urlusername:", urlusername, ", amountValue:", amountValue);
    }
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
});
