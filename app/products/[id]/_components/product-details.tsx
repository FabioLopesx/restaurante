"use client";

import Image from "next/image";
import {
  calculateProductTotalPrice,
  formartCurrency,
} from "@/app/_helpers/price";
import DiscoutBadge from "@/app/_components/discount-bage";
import { Prisma } from "@prisma/client";
import { Button } from "@/app/_components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useContext, useState } from "react";
import ProductList from "@/app/_components/product-list";
import DeliveryInfo from "@/app/_components/delivery-info";
import { CartContext } from "@/app/_context/cart";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/app/_components/ui/sheet";
import Cart from "@/app/_components/cart";

import {
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/app/_components/ui/alert-dialog";

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
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isConfirmationDiologOpen, setIsConfirmationDiologOpen] =
    useState(false);

  const { addProductToCart, products } = useContext(CartContext);

  console.log(products);

  const addToCart = ({ emptyCart }: { emptyCart?: boolean }) => {
    addProductToCart({ product: { ...product, quantity }, emptyCart });
    setIsCartOpen(true);
  };

  const handleAddToCartClick = () => {
    // VERIFICAR SE HÁ ALGUM PRODUTO DE OUTRO RESTAURANTE NO CARRINHO
    const hasDifferentRestaurant = products.some(
      (cartProduct) => cartProduct.restaurantId !== product.restaurantId,
    );

    // SE HOUVER, ABRIR UM AVISO
    if (hasDifferentRestaurant) {
      return setIsConfirmationDiologOpen(true);
    }

    addToCart({
      emptyCart: false,
    });
  };

  const handleIncreaseQuantifyClick = () =>
    setQuantity((currentState) => currentState + 1);
  const handleDecreaseQuantifyClick = () =>
    setQuantity((currentState) => (currentState > 1 ? currentState - 1 : 1));

  return (
    <>
      <div className="relative z-50 mt-[-1.5rem] rounded-tl-3xl rounded-tr-3xl bg-white py-5 pl-5">
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
          <span className="text-muted-foreground">
            {product.restaurant.name}
          </span>
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
        <div className="px5">
          <DeliveryInfo restaurant={product.restaurant} />
        </div>
        <div className="mt-6 space-y-3">
          <h3 className="font-semibold">Sobre</h3>
          <p className="text-sm text-muted-foreground">{product.description}</p>
        </div>
        <div className="mb-4 mt-6 space-y-3 px-2">
          <h3 className="font-semibold">Sucos</h3>
          <ProductList products={complementaryProducts} />
        </div>
        <div className="mt-6 px-5">
          <Button
            className="w-full font-semibold"
            onClick={handleAddToCartClick}
          >
            Adicionar a sacola
          </Button>
        </div>
      </div>

      <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
        <SheetContent className="w-[95vw]">
          <SheetHeader>
            <SheetTitle className="text-left text-xl">Sacola</SheetTitle>
          </SheetHeader>
          <Cart setIsOpen={setIsCartOpen} />
        </SheetContent>
      </Sheet>

      <AlertDialog
        open={isConfirmationDiologOpen}
        onOpenChange={setIsConfirmationDiologOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Você só pode adicionar produtos de um restaurante por vez
            </AlertDialogTitle>
            <AlertDialogDescription>
              Deseja mesmo adicionar esse produto? Isso limpará sua sacola.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={() => addToCart({ emptyCart: true })}>
              Esvaziar sacola e adicionar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ProductDetails;
