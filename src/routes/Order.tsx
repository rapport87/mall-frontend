import React from 'react';
import { Box, Button, VStack, RadioGroup, Radio, Text, FormControl, FormLabel, Input, Image } from "@chakra-ui/react";
import { useLocation } from 'react-router-dom';
import { IProductDetail } from '../types'; // 상품 타입 import
import useUser from '../lib/useUser';

export default function Order() {
  const { user } = useUser();  
  const location = useLocation();
  const product: IProductDetail = location.state?.product;
  const quantity = location.state?.quantity || 1; // 기본값 1

  // 상품 가격 계산
  const productPrice = (product?.sale_price || 0) * quantity;
  const shippingFee = 3000; // 배송비
  const totalAmount = productPrice + shippingFee;

  return (
    <VStack spacing={4}>
      <Box>
        <FormControl isRequired>
          <Text>{user?.id}</Text>
          <Text>{user?.name}</Text>
          <FormLabel>받는분 성함</FormLabel>
          <Input type="text" placeholder="이름" />
          <FormLabel>받는분 연락처</FormLabel>
          <Input type="text" placeholder="연락처" />        
          <FormLabel>주소</FormLabel>
          <Input type="text" placeholder="주소" />
          <FormLabel>상세주소</FormLabel>
          <Input type="text" placeholder="상세주소" />
          <FormLabel>우편번호</FormLabel>
          <Input type="text" placeholder="우편번호" />
        </FormControl>
      </Box>
      <Box>
        <Text fontSize="lg">주문상품</Text>
        {product ? (
          <Box>
            <Text>{product.name}</Text>
            <Image src={product.thumbnail} alt={product.name} />
            {/* 추가적인 상품 정보 표시 */}
          </Box>
        ) : (
          <Text>No product selected</Text>
        )}
      </Box>
      <Box>
        <Text fontSize="lg" mb={2}>결제방법</Text>
        <RadioGroup defaultValue="bankTransfer">
          <Radio value="bankTransfer">무통장입금</Radio>
          <Radio value="creditCard">신용카드</Radio>
          <Radio value="samsungPay">삼성페이</Radio>
        </RadioGroup>
      </Box>
      <Box>
        <Text fontSize="lg">결제금액</Text>
        <Text>상품금액: {productPrice?.toLocaleString()}원</Text>
        <Text>배송비: {shippingFee.toLocaleString()}원</Text>
        <Text>결제예정금액: {totalAmount.toLocaleString()}원</Text>
      </Box>
      <Button colorScheme="red" size="lg">
        {totalAmount.toLocaleString()}원 결제하기
      </Button>
    </VStack>
  );
}