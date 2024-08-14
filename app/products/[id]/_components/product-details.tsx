"use client";

import Image from "next/image";
import {
  calculateProductTotalPrice,
  formartCurrency,
} from "@/app/_helpers/price";
import DiscoutBadge from "@/app/_components/discount-bage";
import { Prisma } from "@prisma/client";
import { Button } from "@/app/_components/ui/button";
import {
  BikeIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  TimerIcon,
} from "lucide-react";
import { useState } from "react";
import { Card } from "@/app/_components/ui/card";
import ProductList from "@/app/_components/product-list";

interface ProductDetailsProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: true;
    };
  }>;
  complementaryProducts: Prisma.ProductGetPayload<{
    include: {
      restaurant: true;
    };
  }>[];
}

const ProductDetails = ({
  product,
  complementaryProducts,
}: ProductDetailsProps) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncreaseQuantifyClick = () =>
    setQuantity((currentState) => currentState + 1);
  const handleDecreaseQuantifyClick = () =>
    setQuantity((currentState) => (currentState > 1 ? currentState - 1 : 1));

  return (
    <div className="pl-5">
      {/* RESTAURANTE */}
      <div className="flex items-center gap-[6px] px-4">
        <div className="relative h-10 w-10">
          <Image
            src={product.restaurant.imageUrl}
            alt={product.restaurant.name}
            fill
            className="rounded-full object-cover"
          />
        </div>
        <span className="text-muted-foreground">{product.restaurant.name}</span>
      </div>

      {/* NOME DO PRODUTO */}
      <h1 className="mb-2 mt-1 px-5 text-xl font-semibold">{product.name}</h1>

      {/* PREÇO DO PRODUTO E QUANTIDADE */}
      <div className="flex justify-between px-5">
        {/* PREÇO COM DESCONTO */}
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold">
              {formartCurrency(calculateProductTotalPrice(product))}
            </h2>
            {product.discountPercentage > 0 && (
              <DiscoutBadge product={product} />
            )}
          </div>
          {/* PREÇO ORIGINAL */}
          {product.discountPercentage > 0 && (
            <p className="text-sm text-muted-foreground">
              De:{formartCurrency(Number(product.price))}
            </p>
          )}
        </div>

        {/* QUANTIDADE */}
        <div className="flex items-center gap-3 text-center">
          <Button
            size="icon"
            variant="ghost"
            className="border border-solid border-muted-foreground"
            onClick={handleDecreaseQuantifyClick}
          >
            <ChevronLeftIcon />
          </Button>
          <span className="w-4">{quantity}</span>
          <Button size="icon" onClick={handleIncreaseQuantifyClick}>
            <ChevronRightIcon />
          </Button>
        </div>
      </div>

      {/* DADOS DA ENTREGA */}
      <Card className="mt-6 flex justify-around py-3">
        {/* CUSTO */}
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1 text-muted-foreground">
            <span className="text-xs">Entrega</span>
            <BikeIcon size={14} />
          </div>

          {Number(product.restaurant.deliveryFee) > 0 ? (
            <p className="text-xs font-semibold">
              {formartCurrency(Number(product.restaurant.deliveryFee))}
            </p>
          ) : (
            <p className="text-sm font-semibold">Grátis</p>
          )}
        </div>

        {/* TEMPO */}
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1 text-muted-foreground">
            <span className="text-xs">Entrega</span>
            <TimerIcon size={14} />
          </div>

          <div className="text-sm font-semibold">
            {product.restaurant.deliveryTimeMinutes} Min
          </div>
        </div>
      </Card>

      <div className="mt-6 space-y-3">
        <h3 className="font-semibold">Sobre</h3>
        <p className="text-sm text-muted-foreground">{product.description}</p>
      </div>

      <div className="mt-6 space-y-3 px-5">
        <h3 className="font-semibold">Sucos</h3>
        <ProductList products={complementaryProducts} />
      </div>
    </div>
  );
};

export default ProductDetails;
