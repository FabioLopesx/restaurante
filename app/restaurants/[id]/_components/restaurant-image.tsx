"use client";

import { Button } from "@/app/_components/ui/button";
import { isRestaurantFavorited } from "@/app/_helpers/restaurant";
import useToggleFavoriteRestaurant from "@/app/_hooks/use-toggle-favorite-restaurant";
import { Restaurant, UserFavoriteRestaurant } from "@prisma/client";
import { ChevronLeftIcon, HeartIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface RestaurantImageProps {
  restaurant: Pick<Restaurant, "id" | "imageUrl" | "name">;
  userFavoriteRestaurants: UserFavoriteRestaurant[];
}

const RestaurantImage = ({
  restaurant,
  userFavoriteRestaurants,
}: RestaurantImageProps) => {
  const { data } = useSession();

  const router = useRouter();

  const isFavorite = isRestaurantFavorited(
    restaurant.id,
    userFavoriteRestaurants,
  );

  const { handleFavoriteClick } = useToggleFavoriteRestaurant({
    restaurantId: restaurant.id,
    userId: data?.user?.id,
    restaurantIsFavorited: isFavorite,
  });

  const handelBackClick = () => router.back();

  return (
    <div className="relative h-[250px] w-full">
      <Image
        src={restaurant?.imageUrl}
        alt={restaurant?.name}
        fill
        className="object-cover"
      />

      <Button
        className="absolute left-4 top-4 rounded-full bg-white text-foreground hover:text-white"
        size="icon"
        onClick={handelBackClick}
      >
        <ChevronLeftIcon />
      </Button>

      <Button
        size="icon"
        className={`absolute right-2 top-2 h-7 w-7 rounded-full bg-gray-700 ${isFavorite && "bg-primary"}`}
        onClick={handleFavoriteClick}
      >
        <HeartIcon size={16} className="fill-white hover:fill-red-950" />
      </Button>
    </div>
  );
};

export default RestaurantImage;
