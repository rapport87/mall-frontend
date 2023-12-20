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
} from '@chakra-ui/react';
import { getOrderDetail } from '../api';
import { IOrderProducts } from '../types';
import { useParams } from "react-router-dom";

function OrderDetail() {
  const { username, order_id } = useParams();
  const { data: orderItems, isLoading, error } = useQuery<IOrderProducts[], Error>(['orderDetail', username, order_id], getOrderDetail);

  if (isLoading) return <Box>Loading...</Box>;

  if (error) return <Box>An error has occurred: {error.message}</Box>;

  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  console.log(orderItems);

  return (
    <Center mt={10}>
      <VStack maxWidth="1000px" w="full" spacing={4}>
        <Heading as="h1" size="lg">주문 상세</Heading>
        <Table mt={5} variant="simple">
          <Thead>
            <Tr>
              <Th textAlign="center" fontSize="lg">상품명</Th>
              <Th textAlign="center" fontSize="lg">수량</Th>
              <Th textAlign="center" fontSize="lg">가격</Th>
            </Tr>
          </Thead>
          <Tbody>
          {orderItems?.map((item, index) => (
              <Tr key={item.product_id}>
                <Td>
                  <HStack spacing={3}>
                    <Image src={item.thumbnail} alt={item.product_name} boxSize="50px" />
                    <Text>{item.product_name}</Text>
                  </HStack>
                </Td>
                <Td textAlign="center">{item.quantity}</Td>
                <Td textAlign="right">{formatPrice(item.sale_price * item.quantity)}원</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </VStack>
    </Center>
  );
}

export default OrderDetail;