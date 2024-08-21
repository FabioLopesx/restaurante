import Image from "next/image";
import { CartContext, CartProduct } from "../_context/cart";
import { calculateProductTotalPrice, formartCurrency } from "../_helpers/price";
import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useContext } from "react";

interface CartItemProps {
  cartProduct: CartProduct;
}

const CartItem = ({ cartProduct }: CartItemProps) => {
  const {
    decreaseProductQuantity,
    increaseProductQuantity,
    removeProductFromCart,
  } = useContext(CartContext);

  const handleDecreaseQuantifyClick = () =>
    decreaseProductQuantity(cartProduct.id);

  const handleIncreaseQuantifyClick = () =>
    increaseProductQuantity(cartProduct.id);

  const handleRemoveClick = () => removeProductFromCart(cartProduct.id);

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        {/* IMAGEM E INFO */}
        <div className="relative h-20 w-20">
          <Image
            src={cartProduct.imageUrl}
            alt={cartProduct.name}
            fill
            className="rounded-lg object-cover"
          />
        </div>

        <div className="space-y-1">
          <h3 className="text-xs">{cartProduct.name}</h3>

          <div className="flex items-center gap-1">
            <h4 className="text-sm font-semibold">
              {formartCurrency(
                Number(calculateProductTotalPrice(cartProduct)) *
                  cartProduct.quantity,
              )}
            </h4>
            {cartProduct.discountPercentage > 0 && (
              <span className="text-xs text-muted-foreground line-through">
                {formartCurrency(
                  Number(cartProduct.price) * cartProduct.quantity,
                )}
              </span>
            )}
          </div>

          {/* QUANTIDADE  */}
          <div className="flex items-center gap-3 text-center">
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 border border-solid border-muted-foreground"
            >
              <ChevronLeftIcon
                size={18}
                onClick={handleDecreaseQuantifyClick}
              />
            </Button>
            <span className="w-4 text-sm">{cartProduct.quantity}</span>
            <Button size="icon" className="h-8 w-8">
              <ChevronRightIcon
                size={18}
                onClick={handleIncreaseQuantifyClick}
              />
            </Button>
          </div>
        </div>
      </div>

      {/* BOTAO DE DELETAR */}
      <Button
        size="icon"
        variant="ghost"
        className="h-8 w-8 border border-solid border-muted-foreground"
        onClick={handleRemoveClick}
      >
        <TrashIcon size={18} />
      </Button>
    </div>
  );
};

export default CartItem;
