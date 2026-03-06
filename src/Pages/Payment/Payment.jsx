import React, { useContext, useState } from "react";
import Classes from "./Payment.module.css";
import LayOut from "../../Components/LayOut/LayOut";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios"; // Make sure to install: npm install axios
import { useNavigate } from "react-router-dom";
import { Type } from "../../Utility/actiontype";

function Payment() {
  const [{ user, basket }, dispatch] = useContext(DataContext);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);

  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  const totalPrice = basket?.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);

  const handlePayment = async (e) => {
    e.preventDefault();
    setProcessing(true);
    setError(null);

    // 1. Check if stripe is loaded
    if (!stripe || !elements) {
      setError("Stripe not loaded yet");
      setProcessing(false);
      return;
    }

    // 2. Get the card element
    const cardElement = elements.getElement(CardElement);

    try {
      // 3. Create payment method with Stripe
      const { error: stripeError, paymentMethod } =
        await stripe.createPaymentMethod({
          type: "card",
          card: cardElement,
        });

      if (stripeError) {
        setError(stripeError.message);
        setProcessing(false);
        return;
      }

      // 4. Send payment to your backend
      console.log("Sending to backend:", {
        paymentMethodId: paymentMethod.id,
        amount: totalPrice,
        items: basket,
      });

      const { data } = await axios.post(
        "http://localhost:5000/payment/create",
        null,
        {
          params: {
            total: Math.round(totalPrice * 100), // Convert to cents
          },
        },
      );

      console.log("Backend response:", data);

      // 5. Confirm the payment
      const { error: confirmError, paymentIntent } =
        await stripe.confirmCardPayment(data.clientSecret, {
          payment_method: paymentMethod.id,
        });

      if (confirmError) {
        setError(confirmError.message);
        setProcessing(false);
        return;
      }

      // 6. Payment successful!
      console.log("Payment successful:", paymentIntent);
      setSucceeded(true);

      // 7. Save order to database
      try {
        const orderData = {
          userEmail: user?.email,
          items: basket.map((item) => ({
            productId: item.id || item._id,
            title: item.title,
            price: item.price,
            quantity: item.amount,
            imageUrl: item.imageUrl, // ✅ THIS MUST COME FROM YOUR PRODUCT DATA!
          })),
          totalAmount: totalPrice,
          paymentIntentId: paymentIntent.id,
        };

        console.log("Saving order with REAL images:", orderData);
        await axios.post("http://localhost:5000/api/orders", orderData);
      } catch (orderError) {
        console.error("Error saving order:", orderError);
      }
      console.log(
        "Basket items:",
        basket.map((item) => ({
          id: item.id,
          title: item.title,
          imageUrl: item.imageUrl,
          image: item.image, // Check both fields
        })),
      );
      // 8. Clear the basket
      dispatch({ type: Type.EMPTY_BASKET });

      // 9. Redirect to orders page after 2 seconds
      setTimeout(() => {
        navigate("/orders");
        s;
      }, 2000);
    } catch (err) {
      console.error("Payment error:", err);
      setError(err.response?.data?.message || err.message || "Payment failed");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <LayOut>
      {/* Header */}
      <div className={Classes.payment__header}>
        Checkout ({totalItem || 0} {totalItem === 1 ? "item" : "items"})
      </div>

      {/* Payment Method */}
      <section className={Classes.payment}>
        {/* Address Section */}
        <div className={Classes.flex}>
          <h3>Delivery Address</h3>
          <div className={Classes.address}>
            <div>{user?.email || "Guest User"}</div>
            <div>123 React Lane</div>
            <div>Chicago, IL 60601</div>
          </div>
        </div>
        <hr />

        {/* Products Section */}
        <div className={Classes.products}>
          <h3>Review items and delivery</h3>
          <div className={Classes.product__list}>
            {basket?.length > 0 ? (
              basket?.map((item) => (
                <ProductCard
                  key={item.id}
                  product={item}
                  flex={true}
                  renderAdd={false}
                />
              ))
            ) : (
              <p className={Classes.empty__cart}>Your cart is empty</p>
            )}
          </div>
        </div>
        <hr />

        {/* Payment Method Section with Stripe */}
        <div className={Classes.flex}>
          <h3>Payment Methods</h3>
          <div className={Classes.payment__form}>
            {succeeded ? (
              <div className={Classes.success}>
                <h4>✅ Payment Successful!</h4>
                <p>Thank you for your order. Redirecting to orders page...</p>
              </div>
            ) : (
              <>
                <div className={Classes.total}>
                  <span>Total:</span>
                  <span className={Classes.total__amount}>
                    ${totalPrice?.toFixed(2) || "0.00"}
                  </span>
                </div>

                <form onSubmit={handlePayment}>
                  <div className={Classes.card__element}>
                    <CardElement
                      options={{
                        style: {
                          base: {
                            fontSize: "16px",
                            color: "#424770",
                            "::placeholder": {
                              color: "#aab7c4",
                            },
                          },
                          invalid: {
                            color: "#9e2146",
                          },
                        },
                        hidePostalCode: true,
                      }}
                    />
                  </div>

                  {error && <div className={Classes.error}>{error}</div>}

                  <button
                    type="submit"
                    className={Classes.pay__button}
                    disabled={!stripe || processing || succeeded}
                  >
                    {processing
                      ? "Processing..."
                      : `Pay $${totalPrice?.toFixed(2) || "0.00"}`}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Payment;
