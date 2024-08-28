import { Suspense } from "react";
import Restaurants from "./_components/restaurants";

const RestaurantPage = () => {
  return (
    <Suspense>
      <Restaurants />
    </Suspense>
  );
};

export default RestaurantPage;
