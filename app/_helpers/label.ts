import { OrderStatus } from "@prisma/client";

export const LabelColor = (status: OrderStatus) => {
  switch (status) {
    case "CANCELED":
      return "bg-red-500 text-white";
    case "DELIVERING":
      return "bg-yellow-500 text-black";
    case "CONFIRMED":
      return "bg-blue-500 text-white";
    case "COMPLETED":
      return "bg-green-500 text-white";
    case "PREPARING":
      return "bg-purple-500 text-white";
  }
};
