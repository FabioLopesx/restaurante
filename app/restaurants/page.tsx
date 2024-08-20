"use client";

import { notFound, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Restaurant } from "@prisma/client";
import Header from "../_components/header";
import RestaurantItem from "../_components/restaurant-item";
import { searchForRestaurants } from "./_actions/seach";

const Restaurants = () => {
  const searchParams = useSearchParams();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  const searchFor = searchParams.get("search");

  useEffect(() => {
    const fetchRestaurants = async () => {
      if (!searchFor) return;
      const foundRestaurants = await searchForRestaurants(searchFor);
      setRestaurants(foundRestaurants);
    };

    fetchRestaurants();
  }, [searchFor]);

  if (!searchFor) {
    return notFound();
  }

  return (
    <>
      <Header />
      <div className="p-5">
        <h2 className="pb-2 pl-1 text-lg font-semibold">
          Restaurantes Encontrados
        </h2>
        <div className="space-y-4">
          {restaurants.map((restaurant) => (
            <RestaurantItem key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Restaurants;
