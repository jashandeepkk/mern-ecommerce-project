import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import API from "../../api/cartApi";

const CartContext = createContext();

export const CartProvider = ({
  children,
}) => {

  const [cart, setCart] =
    useState([]);

  /* LOAD CART */
  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {

    try {

      const token =
        localStorage.getItem(
          "token"
        );

      if (!token) return;

      const res = await API.get(
        "/",
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      setCart(
        res.data.items || []
      );

    } catch (error) {

      console.log(
        "FETCH CART ERROR:",
        error
      );
    }
  };

  const addToCart = async (
    product
  ) => {

    try {

      const token =
        localStorage.getItem(
          "token"
        );

      const res = await API.post(
        "/add",
        { product },
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      setCart(
        res.data.items || []
      );

    } catch (error) {

      console.log(
        "ADD CART ERROR:",
        error
      );
    }
  };

  const removeFromCart =
    async (productId) => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const res =
          await API.post(
            "/remove",
            { productId },
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        setCart(
          res.data.items || []
        );

      } catch (error) {

        console.log(
          "REMOVE CART ERROR:",
          error
        );
      }
    };

  const updateQty = async (
    productId,
    type
  ) => {

    try {

      const token =
        localStorage.getItem(
          "token"
        );

      const res = await API.post(
        "/update",
        {
          productId,
          type,
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      setCart(
        res.data.items || []
      );

    } catch (error) {

      console.log(
        "UPDATE QTY ERROR:",
        error
      );
    }
  };

  const totalPrice =
    cart.reduce(
      (total, item) =>
        total +
        item.price * item.qty,
      0
    );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQty,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () =>
  useContext(CartContext);