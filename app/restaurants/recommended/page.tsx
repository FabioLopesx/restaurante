import Header from "@/app/_components/header";
import RestaurantItem from "@/app/_components/restaurant-item";
import { db } from "@/app/_lib/prisma";

const RecommendedRestaurants = async () => {
  const restaurants = await db.restaurant.findMany({});
  return (
    <>
      <Header />
      <div className="p-5">
        <h2 className="pb-2 pl-1 text-lg font-semibold">
          Lista de Restaurantes{" "}
        </h2>
        <div className="space-y-4"></div>
        {restaurants.map((restaurant) => (
          <RestaurantItem key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </>
  );
};

export default RecommendedRestaurants;
