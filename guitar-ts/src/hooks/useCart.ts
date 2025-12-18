
import { useEffect, useState, useMemo } from "react";
import { db } from "../data/db";
import type { CartTypes, GuitarTypes } from "../types";


export const useCart = () => {

const initialCart = () : CartTypes[] => {
    const localStorageCart = localStorage.getItem("cart");
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  };
  const [guitars] = useState(db);
  const [cart, setCart] = useState(initialCart);

  const maxQuantity = 5;
  const minQuantity = 1;

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  function addToCart(item : GuitarTypes) {
    const itemExists = cart.findIndex((guitar) => guitar.id === item.id);

    console.log(itemExists);

    if (itemExists >= 0) {
      if (cart[itemExists].quantity >= maxQuantity) return;
      //existe en el carro
      const updatedCart = [...cart];
      updatedCart[itemExists].quantity++;
      setCart(updatedCart);
    } else {
      const newItem : CartTypes = {
        ...item,
        quantity: 1,
      };
      setCart([...cart, newItem]);
   
    }
  }

  function removeTrashCart() {
    setCart([]);
  }

  function removeFromCart(id: GuitarTypes["id"]) {
    const updatedCart = cart.filter((item) => item.id !== id);

    setCart(updatedCart);
  }

  function increaseQuantity(id : GuitarTypes["id"]) {
    const updatedCart = cart.map((item) => {
      if (item.id === id && item.quantity < maxQuantity) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });

    setCart(updatedCart);
  }

  function decreaseQuantity(id : GuitarTypes["id"]) {
    const updatedCart = cart.map((item) => {
      if (item.id === id && item.quantity > minQuantity) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCart(updatedCart);
  }

  const isEmpty = useMemo(() => cart.length === 0, [cart]);
  const cartTotal = useMemo(
    () => cart.reduce((total, item) => total + item.price * item.quantity, 0),
    [cart]
  );

    return {

        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        removeTrashCart,
        cart,
        guitars,
        isEmpty,
        cartTotal,
        
    }


}

