import { UserFavoriteRestaurant } from "@prisma/client";

export const isRestaurantFavorited = (
  restaurantId: string,
  userFavoriteResuraunts: UserFavoriteRestaurant[],
) => userFavoriteResuraunts?.some((fav) => fav.restaurantId === restaurantId);
