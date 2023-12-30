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
import { getOrderHistory } from '../api';
import { IOrderHistoryList } from '../types';
import { Link, useParams } from "react-router-dom";

function OrderHistory() {
    const { username } = useParams();
    const { data: orders, isLoading, error } = useQuery<IOrderHistoryList[], Error>(['orders', username], getOrderHistory);

    if (isLoading) return <Box>Loading...</Box>;
    if (error) return <Box>An error has occurred: {error.message}</Box>;

    const formatPrice = (price: number) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const formatDate = (dateString: string) => {
    const date = new Date(dateString);
        return date.toLocaleDateString('ko-KR');
    };

  return (
    <Center mt={10}>
      <VStack maxWidth="1000px" w="full" spacing={4}>
        <Heading as="h1" size="lg">주문내역</Heading>
        <Table mt={5} variant="simple">
          <Thead>
            <Tr>
              <Th textAlign="center" fontSize="lg">주문번호</Th>
              <Th textAlign="center" fontSize="lg">주문일자</Th>
              <Th textAlign="center" fontSize="lg" colSpan={2}>주문상품</Th>
              <Th textAlign="center" fontSize="lg">총 가격</Th>
            </Tr>
          </Thead>
          <Tbody>
            {orders && orders.map((order) => (
              <Tr key={order.order_id}>
                <Td textAlign="center">{order.order_id}</Td>
                <Td textAlign="center">{formatDate(order.created_at)}</Td>
                <Td colSpan={2}>
                <Link to={`/order/${order.username}/${order.order_id}`}>
                  <HStack spacing={3}>
                        <Image src={order.first_product_thumbnail} alt={order.first_product} boxSize="50px" />
                        <Text>{order.first_product}</Text>
                  </HStack>
                  </Link>
                </Td>
                <Td textAlign="right">{formatPrice(order.total_product_price+order.shipping_fee)}원</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </VStack>
    </Center>
  );
}

export default OrderHistory;