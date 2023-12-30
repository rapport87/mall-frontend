import React, { useEffect } from 'react';
import { Box, Button, VStack, RadioGroup, Radio, Text, FormControl, FormLabel, Input, Image, InputGroup, InputLeftAddon, Center, Table, Tr, Th, Thead, Tbody, Td, HStack, Flex, Divider } from "@chakra-ui/react";
import { useLocation, useNavigate } from 'react-router-dom';
import { IProductDetail } from '../types'; // 상품 타입 import
import useUser from '../lib/useUser';
import { createOrder, clearCart } from "../api"
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

interface ICreateOrderForm{
  user_id : number;
  username : string;
  recipient_name : string;
  recipient_tel : string;
  address : string;
  address_detail : string;
  zip_code : number;
  order_request : string;
  payment : number;
  shipping_fee : number;
}

interface IProductInOrder extends IProductDetail {
  quantity: number;
}

export default function Order() {
  const navigate = useNavigate(); 
  const inputAddonWidth = "100px";
  const { user } = useUser();  
  const location = useLocation();

  const products: IProductInOrder[] = location.state?.product || [];
  const fromCart: boolean = location.state?.fromCart || false;

  // 상품 가격 계산
  const productPrice = products.reduce((total: number, product: IProductInOrder) => total + (product.sale_price || 0) * product.quantity, 0);
  const shippingFee = products.reduce((maxFee, item) => {return item.shipping_fee > maxFee ? item.shipping_fee : maxFee;}, 0) || 0;
  const totalAmount = productPrice + shippingFee;

  console.log("fee = " + shippingFee);

  const { 
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ICreateOrderForm>();

  useEffect(() => {
    reset({
      user_id: user?.id || 999999999,
      username: user?.username || 'nothing',
    });
  }, [user, reset]);  

const mutation = useMutation(createOrder, {
      onMutate: () => {
        console.log("Start to Mutate")
      },
      onError: (error: AxiosError) =>{
        console.log(`error occurred ${error.response?.data}`);
      },
      onSuccess: async () => {
        alert("주문이 완료되었습니다"); 

        if (fromCart) {
          try {
            // 장바구니 주문시 장바구니 삭제
            await clearCart();
            
          } catch (error) {
            console.error("Failed to clear cart:", error);
          }
        }

        navigate('/');
      }
  });

  function onOrderSubmit({ user_id, username, recipient_name, recipient_tel, address, address_detail, zip_code, order_request, payment }: ICreateOrderForm) {
  const orderItems = products.map(product => ({
    product_id: product.id,
    product_name: product.name,
    sale_price: product.sale_price,
    quantity: product.quantity,
    thumbnail: product.thumbnail,
  }));

  // console.log("orderItem : " + orderItems);
  mutation.mutate({ user_id, username, recipient_name, recipient_tel, address, address_detail, zip_code, order_request, order_items: orderItems, payment, shipping_fee : shippingFee});
}


  return (
    <Center mt={10}>
      <VStack maxWidth="1000px" w="full" spacing={4} as={"form"} onSubmit={handleSubmit(onOrderSubmit)}>  
        <Box width="100%">
          <FormControl isRequired>
            <Input 
            type="hidden" 
            value={user?.id}
            {...register("user_id")} />
            <Input 
            type="hidden" 
            value={user?.name}
            {...register("username")} />

        <Box width="full">
          <FormLabel fontSize={'x-large'}>주문상품</FormLabel>
          <Divider sx={{borderColor: "gray.300" , borderWidth: "1px"}} />
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>상품명</Th>
                  <Th>가격</Th>
                  <Th>수량</Th>
                  <Th>합계</Th>
                </Tr>
              </Thead>
              <Tbody>
                {products.map((product, index) => (
                  <Tr key={index}>
                    <Td>
                      <HStack>
                        <Image src={product.thumbnail} alt={product.name} boxSize="50px" />
                        <Text>{product.name}</Text>
                      </HStack>
                    </Td>
                    <Td>{product.sale_price?.toLocaleString()}원</Td>
                    <Td>{product.quantity}</Td>
                    <Td>{(product.sale_price * product.quantity).toLocaleString()}원</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
            <Divider sx={{borderColor: "gray.300" , borderWidth: "1px"}} />
          </Box>
          <Box width="full">
            <HStack spacing={10} justifyContent="space-between">
            <Box width="full" textAlign="right">
              <Flex justifyContent="flex-end" alignItems="center">
                <Text>상품금액: {productPrice?.toLocaleString()}원</Text>
                <Text mx={2}>+</Text>
                <Text>배송비: {shippingFee.toLocaleString()}원</Text>
                <Text mx={2}>=</Text>
                <Text>결제예정금액: {totalAmount.toLocaleString()}원</Text>
              </Flex>
            </Box>
            </HStack>
          </Box>

          <FormLabel mt={"10"} fontSize={'x-large'}>받는분 정보</FormLabel>
            <Divider mb={"3"} sx={{borderColor: "gray.300" , borderWidth: "1px"}} />
            <InputGroup>
              <InputLeftAddon children="이름" width={inputAddonWidth} />
              <Input 
              type="text" placeholder="이름"
              {...register("recipient_name")} />
            </InputGroup>

            <InputGroup mt={1}>
              <InputLeftAddon children="연락처" width={inputAddonWidth}  />
              <Input type="text" placeholder="연락처"
              {...register("recipient_tel")} />
            </InputGroup>

            <InputGroup mt={1}>
              <InputLeftAddon children="주소" width={inputAddonWidth}  />
              <Input type="text" placeholder="주소"
              {...register("address")}
              />
              
            </InputGroup>

            <InputGroup mt={1}>
              <InputLeftAddon children="상세주소" width={inputAddonWidth}  />
              <Input type="text" placeholder="상세주소"
              {...register("address_detail")}
              />
            </InputGroup>

            <InputGroup mt={1}>
              <InputLeftAddon children="우편번호" width={inputAddonWidth}  />
              <Input type="text" placeholder="우편번호" 
              {...register("zip_code")}
              />
            </InputGroup>

            <InputGroup mt={1}>
              <InputLeftAddon children="요청사항" width={inputAddonWidth}  />
              <Input type="text" placeholder="요청사항" 
              {...register("order_request")}
              />
            </InputGroup>            
            <Box mt={"10"} w="full">
              <FormLabel fontSize={'x-large'}>결제방법</FormLabel>
              <Divider sx={{borderColor: "gray.300" , borderWidth: "1px"}} />
              <RadioGroup name="payment" mt={"3"} defaultValue="bankTransfer">
                <Radio {...register("payment")} value="1">무통장입금</Radio>
                <Radio {...register("payment")} ml={"5"} value="2">신용카드</Radio>
                <Radio {...register("payment")} ml={"5"} value="3">삼성페이</Radio>
              </RadioGroup>
            </Box>            
          </FormControl>
        </Box>
        <Divider sx={{borderColor: "gray.300" , borderWidth: "1px"}} />




                
        <Button colorScheme="red" size="lg" isLoading={mutation.isLoading} type="submit">
          {totalAmount.toLocaleString()}원 결제하기
        </Button>
      </VStack>
    </Center>
  );
}