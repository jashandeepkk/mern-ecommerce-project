import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const WishlistContext =
  createContext();

export const WishlistProvider = ({
  children,
}) => {
  const [wishlist, setWishlist] =
    useState([]);

  // TEMP USER
  const userId = "user123";

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist =
    async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/wishlist/${userId}`
        );

        const data =
          await res.json();

        console.log(data);

        setWishlist(
          data.items || []
        );

      } catch (error) {
        console.log(
          "FETCH WISHLIST ERROR:",
          error
        );
      }
    };

  // ADD / REMOVE
  const toggleWishlist =
    async (product) => {
      try {

        const res = await fetch(
          "http://localhost:5000/api/wishlist/toggle",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              userId,
              product,
              productId:
                product._id,
            }),
          }
        );

        const data =
          await res.json();

        console.log(data);

        setWishlist(
          data.items || []
        );

        
        window.dispatchEvent(
          new Event(
            "wishlistUpdated"
          )
        );

      } catch (error) {

        console.log(
          "TOGGLE WISHLIST ERROR:",
          error
        );
      }
    };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        toggleWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist =
  () =>
    useContext(
      WishlistContext
    );