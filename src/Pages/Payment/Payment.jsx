import React, { useContext, useState } from "react";
import Classes from "./Payment.module.css";
import LayOut from "../../Components/LayOut/LayOut";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

function Payment() {
  const [{ user, basket }] = useContext(DataContext);
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);

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

    if (!stripe || !elements) {
      setError("Stripe not loaded yet");
      setProcessing(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);

    try {
      const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (stripeError) {
        setError(stripeError.message);
        console.error('Stripe error:', stripeError);
      } else {
        console.log('Payment success:', paymentMethod);
        // Send paymentMethod.id to your backend
        // await axios.post('http://localhost:5000/api/payments', {
        //   paymentMethodId: paymentMethod.id,
        //   amount: totalPrice,
        // });
      }
    } catch (err) {
      setError('Payment failed: ' + err.message);
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
                        fontSize: '16px',
                        color: '#424770',
                        '::placeholder': {
                          color: '#aab7c4',
                        },
                      },
                      invalid: {
                        color: '#9e2146',
                      },
                    },
                    hidePostalCode: true, // Hide postal code field
                  }}
                />
              </div>
              
              {error && <div className={Classes.error}>{error}</div>}
              
              <button 
                type="submit" 
                className={Classes.pay__button}
                disabled={!stripe || processing}
              >
                {processing ? "Processing..." : `Pay $${totalPrice?.toFixed(2) || "0.00"}`}
              </button>
            </form>
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Payment;