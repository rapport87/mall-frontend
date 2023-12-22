import React from 'react';
import { Box, Text, Image } from "@chakra-ui/react";
import { IProductDetail } from '../types'; // 상품 타입 import

interface IOrderProductsProps {
  product: IProductDetail;
}

export default function OrderProducts({ product }: IOrderProductsProps) {
  if (!product) {
    return <Box>No product selected</Box>;
  }

  return (
    <Box>
      <Text fontSize="lg">주문상품</Text>
      <Box>
        <Text>{product.name}</Text>
        <Image src={product.thumbnail} alt={product.name} />
      </Box>
    </Box>
  );
}