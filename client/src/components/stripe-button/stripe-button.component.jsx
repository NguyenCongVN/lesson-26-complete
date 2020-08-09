import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey =
    "pk_test_51HBF90LQXu2XsX9yZCZjZx0XT4vZj4ekZtNmtuONojzArSCsn8LDulBJNH2EuaNirZYcYUqMoKTwi56tu3ZecsTK00UuPeP15k";

  const onToken = (token) => {
    console.log(token);
    axios({
      url: "/payment",
      method: "POST",
      data: {
        amount: priceForStripe,
        token,
      },
    })
      .then((response) => {
        alert("Payment successful");
      })
      .catch((error) => {
        console.log(error, JSON.parse(error));
        console.log(
          "There's an issue here ! Make sure you provide right credit card information"
        );
      });
  };

  return (
    <StripeCheckout
      label="Pay Now"
      name="CRWN Clothing Ltd."
      billingAddress
      shippingAddress
      image="https://svgshare.com/i/CUz.svg"
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
