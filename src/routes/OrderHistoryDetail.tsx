import React from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Box,
  Image,
  VStack,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Center,
  HStack,
  Text,
  Stack,
  Tfoot,
} from '@chakra-ui/react';
import { getOrderHistory, getOrderHistoryDetail } from '../api';
import { IOrderHistoryList, IOrderHistoryProducts } from '../types';
import { useParams } from "react-router-dom";

function OrderHistoryDetail() {
  const { username, order_id } = useParams();
  const { data: orders, isLoading, error } = useQuery<IOrderHistoryList, Error>(['orderDetail', username, order_id], getOrderHistoryDetail);
  // const { data: orderItems, isLoading, error } = useQuery<IOrderHistoryProducts[], Error>(['orderDetail', username, order_id], getOrderHistoryDetail);

  const productPrice = orders?.order_items.reduce((total, item) => {return total + item.sale_price * item.quantity;}, 0) || 0;

  if (isLoading) return <Box>Loading...</Box>;

  if (error) return <Box>An error has occurred: {error.message}</Box>;

  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // console.log(orders);

  return (
    <Center mt={10}>
      <VStack spacing={4} maxWidth="800px" w="full">
        <Heading as="h1" size="lg">주문 상세</Heading>
        <Heading as="h1" size="md">주문상품</Heading>
        <Table mt={5} variant="simple">
          <Thead>
            <Tr>
              <Th textAlign="center" fontSize="lg">상품명</Th>
              <Th textAlign="center" fontSize="lg">수량</Th>
              <Th textAlign="center" fontSize="lg">가격</Th>
            </Tr>
          </Thead>
          <Tbody>
          {orders?.order_items.map((item, index) => (
              <Tr key={item.product_id}>
                <Td>
                  <HStack spacing={3}>
                    <Image ml={15} src={item.thumbnail} alt={item.product_name} boxSize="50px" />
                    <Text>{item.product_name}</Text>
                  </HStack>
                </Td>
                <Td textAlign="center">{item.quantity}</Td>
                <Td textAlign="right"><Text mr={15}>{formatPrice(item.sale_price * item.quantity)}원</Text></Td>
              </Tr>
          ))}
          </Tbody>
        </Table>
        <Heading as="h1" size="md">받는사람정보</Heading>
        <Table mt={5} variant="simple" size="sm" sx={{ tableLayout: "auto" }}>
          <Tbody>
            <Tr>
              <Th fontSize={"md"}>받는사람</Th>
              <Td width="80%">{orders.recipient_name}</Td>
            </Tr>
            <Tr>
              <Th fontSize={"md"}>연락처</Th>
              <Td width="80%">{orders.recipient_tel}</Td>
            </Tr>
            <Tr>
              <Th fontSize={"md"}>받는주소</Th>
              <Td width="80%">({orders.zip_code}){orders.address} {orders.address_detail}</Td>
            </Tr>
            <Tr>
              <Th fontSize={"md"}>배송요청사항</Th>
              <Td width="80%">{orders.order_request}</Td>
            </Tr>                                    
          </Tbody>
        </Table>        
        <Heading as="h1" size="md">결제정보</Heading>
        <Table mt={5} variant="simple">
          <Tbody>
              <Tr>
                <Th w="65%" textAlign="left">결제수단</Th>
                <Th>
                  <HStack>
                    <Box w={"full"}>
                      <Text>총 상품가격</Text>
                    </Box>
                    <Box w={"full"} textAlign={"right"}>
                      {formatPrice(productPrice)}원
                    </Box>
                  </HStack>
                  <HStack>
                    <Box w={"full"}>
                      <Text>배송비</Text>
                    </Box>
                    <Box w={"full"} textAlign={"right"}>
                    {formatPrice(orders.shipping_fee)}원
                    </Box>
                  </HStack>
                </Th>
              </Tr>
          {orders?.order_payment.map((item, index) => (
              <Tr>
                <Th  w="65%" textAlign="left">{item.payment_display}</Th>
                <Th textAlign="left">                  
                  <HStack>
                    <Box w={"full"}>
                      <Text>총 결제금액</Text>
                    </Box>
                    <Box w={"full"} textAlign={"right"}>
                      {formatPrice(productPrice + orders.shipping_fee)}원
                    </Box>
                  </HStack>
                </Th>
              </Tr>
          ))}          
          </Tbody>
        </Table>     
      </VStack>
    </Center>
  );
}

export default OrderHistoryDetail;