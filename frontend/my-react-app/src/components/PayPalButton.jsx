import React, { useEffect, useRef } from "react";

const PayPalButton = () => {
  const paypalRef = useRef();

  useEffect(() => {
    // Load PayPal script dynamically
    const script = document.createElement("script");
    script.src = "https://www.paypal.com/sdk/js?client-id=YOUR_CLIENT_ID&currency=USD";
    script.addEventListener("load", () => {
      window.paypal.Buttons({
        createOrder: function (data, actions) {
          return fetch("/demo/checkout/api/paypal/order/create/", {
            method: "POST",
          })
            .then((res) => res.json())
            .then((orderData) => orderData.id);
        },

        onApprove: function (data, actions) {
          return fetch(`/demo/checkout/api/paypal/order/${data.orderID}/capture/`, {
            method: "POST",
          })
            .then((res) => res.json())
            .then((orderData) => {
              const errorDetail = Array.isArray(orderData.details) && orderData.details[0];
              if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
                return actions.restart();
              }

              if (errorDetail) {
                let msg = "Sorry, your transaction could not be processed.";
                if (errorDetail.description) msg += `\n\n${errorDetail.description}`;
                if (orderData.debug_id) msg += ` (${orderData.debug_id})`;
                return alert(msg);
              }

              const transaction = orderData.purchase_units[0].payments.captures[0];
              alert(`Transaction ${transaction.status}: ${transaction.id}`);
              console.log("Capture result:", orderData);
            });
        },
      }).render(paypalRef.current);
    });

    document.body.appendChild(script);
  }, []);

  return <div ref={paypalRef}></div>;
};

export default PayPalButton;
