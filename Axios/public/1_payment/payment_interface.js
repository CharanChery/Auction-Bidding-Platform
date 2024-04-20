const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const urlusername = urlParams.get("username");

document.addEventListener("DOMContentLoaded", async () => {
  try {
    document.getElementById("upi").addEventListener("click", () => {
      const newpage = "../1_payment/payment.html";
      let fullurl = newpage + "?username=" + encodeURIComponent(urlusername);
      window.location.href = fullurl;
    });
    //card
    document.getElementById("cardpayment").addEventListener("click", () => {
      const newpage = "../Stripe_Payment/Public/checkout.html";
      let fullurl = newpage + "?username=" + encodeURIComponent(urlusername);
      window.location.href = fullurl;
    });
  } catch (error) {
    console.log(error);
  }
});
