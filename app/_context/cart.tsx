/* eslint-disable no-unused-vars */
"use client";

import { Prisma } from "@prisma/client";
import { createContext, ReactNode, useMemo, useState } from "react";
import { calculateProductTotalPrice } from "../_helpers/price";

export interface CartProduct
  extends Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          id: true;
          deliveryFee: true;
          deliveryTimeMinutes: true;
        };
      };
    };
  }> {
  quantity: number;
}

interface IcartContext {
  products: CartProduct[];
  subtotalPrice: number;
  totalPrice: number;
  totalQuantity: number;
  totalDiscounts: number;
  addProductToCart: ({
    product,
    emptyCart,
  }: {
    product: CartProduct;
    emptyCart?: boolean;
  }) => void;
  decreaseProductQuantity: (productId: string) => void;
  increaseProductQuantity: (productId: string) => void;
  removeProductFromCart: (productId: string) => void;
  clearCart: () => void;
}

export const CartContext = createContext<IcartContext>({
  products: [],
  subtotalPrice: 0,
  totalPrice: 0,
  totalQuantity: 0,
  totalDiscounts: 0,
  addProductToCart: () => {},
  decreaseProductQuantity: () => {},
  increaseProductQuantity: () => {},
  removeProductFromCart: () => {},
  clearCart: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<CartProduct[]>([]);

  const subtotalPrice = useMemo(() => {
    return products.reduce((acc, product) => {
      return acc + Number(product.price) * product.quantity;
    }, 0);
  }, [products]);

  const totalPrice = useMemo(() => {
    return (
      products.reduce((acc, product) => {
        return acc + calculateProductTotalPrice(product) * product.quantity;
      }, 0) + Number(products?.[0]?.restaurant.deliveryFee)
    );
  }, [products]);

  const totalQuantity = useMemo(() => {
    return products.reduce((acc, product) => {
      return acc + product.quantity;
    }, 0);
  }, [products]);

  const totalDiscounts =
    subtotalPrice - totalPrice + Number(products?.[0]?.restaurant.deliveryFee);

  const clearCart = () => {
    return setProducts([]);
  };

  const decreaseProductQuantity: IcartContext["decreaseProductQuantity"] = (
    productId: string,
  ) => {
    return setProducts((prev) =>
      prev.map((CartProduct) => {
        if (CartProduct.id === productId) {
          if (CartProduct.quantity === 1) {
            return CartProduct;
          }
          return {
            ...CartProduct,
            quantity: CartProduct.quantity - 1,
          };
        }
        return CartProduct;
      }),
    );
  };

  const increaseProductQuantity: IcartContext["increaseProductQuantity"] = (
    productId: string,
  ) => {
    return setProducts((prev) =>
      prev.map((CartProduct) => {
        if (CartProduct.id === productId) {
          return {
            ...CartProduct,
            quantity: CartProduct.quantity + 1,
          };
        }
        return CartProduct;
      }),
    );
  };

  const removeProductFromCart = (productId: string) => {
    return setProducts((prev) =>
      prev.filter((product) => product.id !== productId),
    );
  };

  const addProductToCart: IcartContext["addProductToCart"] = ({
    product,
    emptyCart,
  }) => {
    if (emptyCart) {
      setProducts([]);
    }

    // VERFICICAR SE O PRODUTO JA ESTÁ NO CARRINHO
    const isProductAlReadyInCart = products.some(
      (CartProduct) => CartProduct.id === product.id,
    );

    // SE SIM, AUMENTAR A QUANTIDADE
    if (isProductAlReadyInCart) {
      return setProducts((prev) =>
        prev.map((CartProduct) => {
          if (CartProduct.id === product.id) {
            return {
              ...CartProduct,
              quantity: CartProduct.quantity + product.quantity,
            };
          }
          return CartProduct;
        }),
      );
    }

    // SE NÃO, ADICIONAR O PRODUTO AO CARRINHO COM A QUANTIDADE QUE RECEBO

    setProducts((prev) => [...prev, product]);
  };

  return (
    <CartContext.Provider
      value={{
        products,
        subtotalPrice,
        totalPrice,
        totalQuantity,
        totalDiscounts,
        clearCart,
        addProductToCart,
        decreaseProductQuantity,
        increaseProductQuantity,
        removeProductFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
