import { Restaurant } from "@prisma/client";
import { BikeIcon, HeartIcon, StarIcon, TimerIcon } from "lucide-react";
import Image from "next/image";
import { formartCurrency } from "../_helpers/price";
import { Button } from "./ui/button";
import Link from "next/link";

interface RestaurantItemProps {
  restaurant: Restaurant;
}

const RestaurantItem = ({ restaurant }: RestaurantItemProps) => {
  return (
    <Link
      className="min-w-[266px] max-w-[266px]"
      href={`/restaurants/${restaurant.id}`}
    >
      <div className="w-full space-y-3">
        {/* IMAGEM */}
        <div className="relative h-[136px] w-full">
          <Image
            src={restaurant.imageUrl}
            fill
            className="rounded-lg object-cover"
            alt={restaurant.name}
          />

          <div className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-white px-2 py-[2px]">
            <StarIcon size={14} className="fill-yellow-400 text-yellow-500" />
            <span className="text-xs font-semibold">5,0</span>
          </div>

          <Button
            size="icon"
            className="absolute right-2 top-2 h-7 w-7 rounded-full bg-gray-700"
          >
            <HeartIcon size={16} className="fill-white hover:fill-red-950" />
          </Button>
        </div>
        {/* TEXTO */}
        <div className="pb-5">
          <h3 className="text-sm font-semibold">{restaurant.name}</h3>
          {/* INFORMACOES DA ENTREGA */}
          <div className="flex gap-3">
            {/* CUSTO DE ENTREGA */}
            <div className="flex items-center gap-1">
              <BikeIcon className="text-primary" size={14} />
              <span className="text-xs text-muted-foreground">
                {Number(restaurant.deliveryFee) === 0
                  ? "Entrega Grátis"
                  : formartCurrency(Number(restaurant.deliveryFee))}
              </span>
            </div>
            {/* TEMPO DE ENTREGA */}
            <TimerIcon className="text-primary" size={14} />
            <span className="text-xs text-muted-foreground">
              {restaurant.deliveryTimeMinutes} min
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantItem;
