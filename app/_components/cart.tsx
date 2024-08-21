import { useContext } from "react";
import { CartContext } from "../_context/cart";
import CartItem from "./cart-item";
import { Card, CardContent } from "./ui/card";
import { formartCurrency } from "../_helpers/price";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

const Cart = () => {
  const { products, subTotalPrice, totalPrice, totalDiscount } =
    useContext(CartContext);
  return (
    <div className="py-5">
      <div className="mb-8 space-y-4">
        {products.map((product) => (
          <CartItem key={product.id} cartProduct={product} />
        ))}
      </div>

      {/* TOTAIS */}
      <div className="mt-6">
        <Card>
          <CardContent className="space-y-2 p-5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{formartCurrency(subTotalPrice)}</span>
            </div>

            <Separator />

            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">ENTREGA</span>
              <span>
                {Number(products[0].restaurant.deliveryFee) === 0 ? (
                  <span className="uppercase text-primary">Grátis</span>
                ) : (
                  formartCurrency(Number(products[0].restaurant.deliveryFee))
                )}
              </span>
            </div>

            <Separator className="h-[1.5px]" />

            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Descontos</span>
              <span>- {formartCurrency(totalDiscount)}</span>
            </div>

            <Separator />

            <div className="flex items-center justify-between text-xs font-semibold">
              <span>Total</span>
              <span>{formartCurrency(totalPrice)}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* FINALIZAR PEDIDO */}
      <Button className="mt-6 w-full">Finalizar pedido</Button>
    </div>
  );
};

export default Cart;
