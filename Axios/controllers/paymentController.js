const stripe = require('stripe')('sk_test_51P40OQSGD6nuXoPYNbgTerWnPHji16xuuIHiSYioTl6uTTVGJozFyK2Ioa1YxQnaOBdjm5UUEdgmjK9Z7f1qrDMV002RcZOvtf');

const calculateOrderAmount = (items) => {
  const totalPrice = items.reduce((total, item) => {
    return total + item.price;
  }, 0);
  return totalPrice * 100; // Stripe amounts are in cents
};

const createPaymentIntent = async (req, res) => {
  const { items, customerName, customerAddress } = req.body;

  try {
    const description = `Export transaction for ${items.length} items. Customer Name: ${customerName}. Customer Address: ${customerAddress}`;

    const customer = await stripe.customers.create({
      name: 'Jenny Rosen',
      address: {
        line1: '510 Townsend St',
        postal_code: '98140',
        city: 'San Francisco',
        state: 'CA',
        country: 'US',
      },
    });
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(items),
      description: description,
      customer: customer.id,
      currency: 'inr',
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Error creating PaymentIntent:', error);
    res.status(500).json({ error: 'Error creating PaymentIntent' });
  }
};

module.exports = {
  createPaymentIntent,
};
