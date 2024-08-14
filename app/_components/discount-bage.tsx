import { Product } from "@prisma/client";
import { ArrowDownIcon } from "lucide-react";

interface DiscountBadgeProps {
  product: Pick<Product, "discountPercentage">;
}

const DiscoutBadge = ({ product }: DiscountBadgeProps) => {
  return (
    <div className="flex items-center gap-1 rounded-full bg-primary px-2 py-[2px] text-white">
      <ArrowDownIcon size={14} />
      <span className="text-xs font-semibold">
        {product.discountPercentage}%
      </span>
    </div>
  );
};

export default DiscoutBadge;
