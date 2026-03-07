import React, { useContext, useState, useEffect } from "react";
import Classes from "./Orders.module.css";
import LayOut from "../../Components/LayOut/LayOut";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import { BASE_URL } from '../../Api/endPoints';
import axios from "axios";

function Orders() {
  const [{ user }] = useContext(DataContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    axios
      .get(`${BASE_URL}/api/orders/user/${user.email}`)
      .then((res) => {
        console.log("Orders fetched:", res.data);
        setOrders(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching orders:", err);
        setLoading(false);
      });
  }, [user]);

  if (loading) {
    return (
      <LayOut>
        <div className={Classes.loading}>Loading your orders...</div>
      </LayOut>
    );
  }

  return (
    <LayOut>
      <div className={Classes.orders__container}>
        <h1 className={Classes.orders__title}>Your Orders</h1>

        {!user ? (
          <div className={Classes.login__message}>
            <p>Please sign in to view your orders</p>
          </div>
        ) : orders.length === 0 ? (
          <div className={Classes.no__orders}>
            <p>You haven't placed any orders yet</p>
          </div>
        ) : (
          <div className={Classes.orders__list}>
            {orders.map((order) => (
              <div key={order._id} className={Classes.order__card}>
                <div className={Classes.order__header}>
                  <div className={Classes.order__info}>
                    <p className={Classes.order__date}>
                      Ordered on:{" "}
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                    <p className={Classes.order__id}>Order ID: {order._id}</p>
                  </div>
                  <div className={Classes.order__total}>
                    <span>Total:</span>
                    <span className={Classes.total__amount}>
                      ${order.totalAmount?.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className={Classes.order__items}>
                  {order.items?.map((orderItem) => (
                    <div
                      key={orderItem.productId}
                      className={Classes.order__item}
                    >
                      {/* ✅ Using item__image class */}
                      <div className={Classes.item__image}>
                        <img
                          src={orderItem.imageUrl || orderItem.image}
                          alt={orderItem.title}
                          onLoad={() =>
                            console.log("✅ Image loaded:", orderItem.productId)
                          }
                          onError={(e) => {
                            console.log(
                              "First attempt failed, trying fallback for:",
                              orderItem.productId,
                            );
                            e.target.onerror = null; // Prevent infinite loop

                            // Try fallback images based on product ID
                            const fallbackImages = {
                              6: "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg",
                              7: "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg",
                              16: "https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2.jpg",
                              17: "https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_.jpg",
                            };

                            // Use the fallback image for this product
                            if (fallbackImages[orderItem.productId]) {
                              e.target.src =
                                fallbackImages[orderItem.productId];
                            } else {
                              // Generic fallback
                              e.target.src = `https://picsum.photos/seed/${orderItem.productId}/100/100`;
                            }
                          }}
                        />
                      </div>

                      {/* ✅ Using item__details class */}
                      <div className={Classes.item__details}>
                        <h4 title={orderItem.title}>
                          {orderItem.title?.length > 50
                            ? orderItem.title.substring(0, 50) + "..."
                            : orderItem.title}
                        </h4>

                        {/* ✅ Using item__price__info class */}
                        <div className={Classes.item__price__info}>
                          <span className={Classes.item__price}>
                            ${orderItem.price?.toFixed(2)}
                          </span>
                          <span className={Classes.item__quantity}>
                            x {orderItem.quantity}
                          </span>
                        </div>

                        {/* ✅ Using item__subtotal class */}
                        <div className={Classes.item__subtotal}>
                          <span>Subtotal:</span>
                          <span className={Classes.subtotal__amount}>
                            ${(orderItem.price * orderItem.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className={Classes.order__status}>
                  <span
                    className={`${Classes.status} ${Classes[order.status]}`}
                  >
                    {order.status?.toUpperCase()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </LayOut>
  );
}

export default Orders;
