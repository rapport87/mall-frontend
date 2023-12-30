import React from 'react';
import { useQuery, useMutation, } from '@tanstack/react-query';
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
  Button,
} from '@chakra-ui/react';
import { getCarts, deleteCartItem, clearCart } from '../api'; // API 호출 변경
import { ICartList } from '../types'; // 장바구니 타입
import { useNavigate } from 'react-router-dom';

function Cart() {
  
    const { data: carts, isLoading, error, refetch } = useQuery<ICartList[], Error>(['carts'], getCarts);
    const navigate = useNavigate();
    const handlePurchase = () => {
      const orderData = (carts || []).map(cartItem => ({
        cart_id: cartItem.id, // 장바구니 아이템의 고유 ID
        id: cartItem.product.id,
        name: cartItem.product.name,
        price: cartItem.product.price,
        sale_price: cartItem.product.sale_price,
        thumbnail: cartItem.product.thumbnail,
        quantity: cartItem.quantity
      }));
  
      navigate('/order', { state: { product: orderData, fromCart: true } });
    };

    const handleDelete = async (cartItemId: number) => {
      try {
        await deleteCartItem(cartItemId);
        refetch(); // 삭제 후 쿼리를 다시 실행하여 데이터 갱신
      } catch (error) {
        console.error("Error deleting cart item:", error);
        // 에러 처리
      }
    };

    const handleClearCart = async () => {
      try {
        await clearCart();
        alert("장바구니를 비웠습니다");
      } catch (error) {
        console.error("Failed to clear cart:", error);
      }
    };

    if (isLoading) return <Box>Loading...</Box>;
    if (error) return <Box>An error has occurred: {error.message}</Box>;

    const formatPrice = (price: number | undefined) => {
        // price가 undefined 또는 null일 경우, 0으로 처리
        if (price === undefined || price === null) {
          price = 0;
        }
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      };

  return (
    <Center mt={10}>
      <VStack maxWidth="1000px" w="full" spacing={4}>
        <Heading as="h1" size="lg">장바구니</Heading>
        <Table mt={5} variant="simple">
          <Thead>
            <Tr>
              <Th textAlign="center" fontSize="lg">상품 이미지</Th>
              <Th textAlign="center" fontSize="lg">상품명</Th>
              <Th textAlign="center" fontSize="lg">수량</Th>
              <Th textAlign="center" fontSize="lg">가격</Th>
            </Tr>
          </Thead>
          <Tbody>
            {carts && carts.map((cartItem) => (
                <Tr key={cartItem.product.id}>
                    <Td textAlign="center">
                    <Center>
                        <Image src={cartItem.product.thumbnail} alt={cartItem.product.name} boxSize="50px" />
                    </Center>
                    </Td>
                    <Td textAlign="center">{cartItem.product.name}</Td>
                    <Td textAlign="center">{cartItem.quantity}</Td>
                    <Td textAlign="right">
                        {formatPrice(cartItem.product.sale_price * cartItem.quantity)}원
                    </Td>
                    <Td textAlign="center">
                        <Button colorScheme="red" onClick={() => handleDelete(cartItem.id)}>
                        삭제
                        </Button>
                    </Td>
                </Tr>
            ))}
          </Tbody>
        </Table>
        <Center>
          <HStack w="full">
            <Button colorScheme="blue" w="full" onClick={handlePurchase}>구매하기</Button>
            <Button colorScheme="red" w="full" onClick={handleClearCart}>장바구니 비우기</Button>
          </HStack>
        </Center>
      </VStack>
    </Center>
  );
}

export default Cart;