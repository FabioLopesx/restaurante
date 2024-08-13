import { Product } from "@prisma/client";

export const calculateProductTotalPrice = (product: Product): Number => {
  if (product.discountPercentage === 0) {
    return Number(product.price);
  }

  const discont = Number(product.price) * (product.discountPercentage / 100);

  return Number(product.price) - discont;
};

export const formartCurrency = (value: Number): string => {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });
};
