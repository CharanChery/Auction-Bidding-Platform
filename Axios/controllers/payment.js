const express = require("express");
const app = express();
const axios = require('axios');

app.use(express.static("public"));
app.use(express.json());

// Endpoint to handle creating a payment intent
app.post("/create-payment-intent", async (req, res) => {
  try {
    // Code to handle creating the payment intent with Stripe goes here...

    // Example data for the payment intent
    const paymentIntentData = {
      items: req.body.items,
      customerName: req.body.customerName,
      customerAddress: req.body.customerAddress
    };

    // Make a POST request to another server using Axios
    const response = await axios.post('http://localhost:5501/api/v5/payment', paymentIntentData);

    // Forward the response from the other server to the client
    res.json(response.data);
  } catch (error) {
    console.error('Error creating payment intent:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
// const PORT = 4242;
// app.listen(PORT, () => {
//   console.log(`Server is listening on port ${PORT}`);
// });
