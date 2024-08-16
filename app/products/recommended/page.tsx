import Header from "@/app/_components/header";
import ProductItem from "@/app/_components/product-item";
import { db } from "@/app/_lib/prisma";

const RecommendeProductsPage = async () => {
  const products = await db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
    take: 20,
    include: {
      restaurant: {
        select: {
          name: true,
        },
      },
    },
  });
  return (
    <>
      <Header />
      <div className="p-5">
        <h2 className="pb-2 pl-1 text-lg font-semibold">
          Pedidos Recomendados
        </h2>
        <div className="grid grid-cols-2 gap-6">
          {products.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              className="min-w-full"
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default RecommendeProductsPage;
