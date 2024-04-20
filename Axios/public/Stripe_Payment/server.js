const express = require("express");
const app = express();
// This is your test secret API key.
const stripe = require("stripe")(
  "sk_test_51P40OQSGD6nuXoPYNbgTerWnPHji16xuuIHiSYioTl6uTTVGJozFyK2Ioa1YxQnaOBdjm5UUEdgmjK9Z7f1qrDMV002RcZOvtf"
);
// const ch =require("./public/checkout");

app.use(express.static("public"));
app.use(express.json());
// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys

// const calculateOrderAmount = (items) => {
//   // Replace this constant with a calculation of the order's amount
//   // Calculate the order total on the server to prevent
//   // people from directly manipulating the amount on the client
//   return 1400;
// };

const calculateOrderAmount = (items) => {
  // Calculate the total order amount based on the prices of items
  const totalPrice = items.reduce((total, item) => {
    // Assuming each item has a 'price' property
    return total + item.price;
  }, 0);

  // In this example, we're returning the totalPrice directly.
  // You may need to apply taxes, discounts, or other calculations here.
  return totalPrice * 100; // Stripe amounts are in cents
};
app.get("/", async (req, res) => {
  res.sendFile(__dirname + "/public/checkout.html");
});

app.post("/create-payment-intent", async (req, res) => {
  const { items, customerName, customerAddress } = req.body;

  // Construct a description including customer name and address
  const description = `Export transaction for ${items.length} items. Customer Name: ${customerName}. Customer Address: ${customerAddress}`;

  const customer = await stripe.customers.create({
    name: "Jenny Rosen",
    address: {
      line1: "510 Townsend St",
      postal_code: "98140",
      city: "San Francisco",
      state: "CA",
      country: "US",
    },
  });

  // Create a PaymentIntent with the order amount, currency, and description
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "inr",
    description: description,
    customer: customer.id,
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

// console.log("transaction_id:",t_id)
app.listen(4242, () => console.log("Node server listening on port 4242!"));
