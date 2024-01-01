import {
    Grid,
  } from "@chakra-ui/react";
  import Product from "../components/Product";
  import ProductSkeleton from "../components/ProductSkeleton";
  import { getCategoryProducts } from "../api";
  import { useQuery } from "@tanstack/react-query";
  import { IProductList } from "../types";
import { useParams } from "react-router-dom";
  
  export default function Category() {
    const { categoryId } = useParams();

    const { isLoading, data } = useQuery<IProductList[]>({
      queryKey:["categories", categoryId],
      queryFn:getCategoryProducts,
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
            key={product.id}
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