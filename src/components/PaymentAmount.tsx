import React from 'react';
import { Box, Text } from "@chakra-ui/react";

interface PaymentAmountProps {
  productPrice: number | undefined;
  shippingFee: number;
  totalAmount: number;
}

export default function PaymentAmount({ productPrice, shippingFee, totalAmount }: PaymentAmountProps) {
  return (
    <Box>
      <Text fontSize="lg">결제금액</Text>
      <Text>상품금액: {productPrice?.toLocaleString()}원</Text>
      <Text>배송비: {shippingFee.toLocaleString()}원</Text>
      <Text>결제예정금액: {totalAmount.toLocaleString()}원</Text>
    </Box>
  );
}