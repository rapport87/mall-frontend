import React from 'react';
import { Box, Button, VStack, RadioGroup, Radio, Text, FormControl, FormLabel, Input, Image, InputGroup, InputLeftAddon, Center } from "@chakra-ui/react";
import { useLocation } from 'react-router-dom';
import { IProductDetail } from '../types'; // 상품 타입 import
import useUser from '../lib/useUser';

export default function Order() {
  const inputAddonWidth = "100px";
  const { user } = useUser();  
  const location = useLocation();
  const product: IProductDetail = location.state?.product;
  const quantity = location.state?.quantity || 1; // 기본값 1

  // 상품 가격 계산
  const productPrice = (product?.sale_price || 0) * quantity;
  const shippingFee = 3000; // 배송비
  const totalAmount = productPrice + shippingFee;

  return (
    <Center mt={10}>
      <VStack maxWidth="1000px" w="full" spacing={4}>
            <Input type="hidden" value={user?.id} />                    
            <Input type="hidden" value={user?.name} />      
        <Box width="100%">
          <FormControl isRequired>
            <Input type="hidden" value={user?.id} />                    
            <Input type="hidden" value={user?.name} />
            
            <FormLabel>받는분 정보</FormLabel>
            <InputGroup>
              <InputLeftAddon children="이름" width={inputAddonWidth} />
              <Input type="text" placeholder="이름" />
            </InputGroup>

            <InputGroup mt={1}>
              <InputLeftAddon children="연락처" width={inputAddonWidth}  />
              <Input type="text" placeholder="연락처" />
            </InputGroup>

            <InputGroup mt={1}>
              <InputLeftAddon children="주소" width={inputAddonWidth}  />
              <Input type="text" placeholder="주소" />
            </InputGroup>

            <InputGroup mt={1}>
              <InputLeftAddon children="상세주소" width={inputAddonWidth}  />
              <Input type="text" placeholder="상세주소" />
            </InputGroup>

            <InputGroup mt={1}>
              <InputLeftAddon children="우편번호" width={inputAddonWidth}  />
              <Input type="text" placeholder="우편번호" />
            </InputGroup>
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
    </Center>
  );
}