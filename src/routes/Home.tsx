import {
  Grid,
} from "@chakra-ui/react";
import Product from "../components/Product";
import ProductSkeleton from "../components/ProductSkeleton";
import { getProducts } from "../api";
import { useQuery } from "@tanstack/react-query";
import { IProductList } from "../types";

export default function Home() {
  const { isLoading, data } = useQuery<IProductList[]>({
    queryKey:["products"],
    queryFn:getProducts,
  });
  return (
    <Grid
      mt={10}
      px={{
        base: 10,
        lg: 40,
      }}
      columnGap={4}
      rowGap={8}
      templateColumns={{
        sm: "1fr",
        md: "1fr 1fr",
        lg: "repeat(3, 1fr)",
        xl: "repeat(4, 1fr)",
        "2xl": "repeat(5, 1fr)",
      }}
    >
      {isLoading ? (
        <>
          <ProductSkeleton />
          <ProductSkeleton />
          <ProductSkeleton />
          <ProductSkeleton />
          <ProductSkeleton />
          <ProductSkeleton />
          <ProductSkeleton />
          <ProductSkeleton />
          <ProductSkeleton />
          <ProductSkeleton />
        </>
      ) : null}
      {data?.map((product) => (
        <Product
          key={product.pk}
          pk={product.pk}
          name={product.name}
          price={product.price}
          salePrice={product.sale_price}
          thumbnail={product.thumbnail}
          displayStatus={product.display_status}
        />
      ))}
    </Grid>
  );
}