import React, { useEffect } from 'react';
import { Box, Button, VStack, RadioGroup, Radio, Text, FormControl, FormLabel, Input, Image, InputGroup, InputLeftAddon, Center } from "@chakra-ui/react";
import { useLocation } from 'react-router-dom';
import { IProductDetail } from '../types'; // 상품 타입 import
import useUser from '../lib/useUser';
import { createOrder } from "../api"
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
}

export default function Order() {

  const inputAddonWidth = "100px";
  const { user } = useUser();  
  const location = useLocation();
  const product: IProductDetail = location.state?.product;
  const quantity = location.state?.quantity || 1; // 기본값 1
  console.log(product);
  // 상품 가격 계산
  const productPrice = (product?.sale_price || 0) * quantity;
  const shippingFee = 3000; // 배송비
  const totalAmount = productPrice + shippingFee;  

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
      // 기타 필요한 기본값들...
    });
  }, [user, reset]);  

const mutation = useMutation(createOrder, {
      onMutate: () => {
        console.log("Start to Mutate")
      },
      onError: (error: AxiosError) =>{
        console.log(`error occurred ${error.response?.data}`);
      },
      onSuccess: () => {
        console.log(`Success Query`);
      }
  });

function onOrderSubmit({
  user_id,
  username,
  recipient_name,
  recipient_tel,
  address,
  address_detail,
  zip_code,
  order_request,
}: ICreateOrderForm){
  const orderItem = {
    product_id: location.state.product?.id,
    product_name: product?.name,
    sale_price: product?.sale_price,
    quantity: quantity,
    thumbnail: product?.thumbnail,
  };

  console.log(user_id, username, recipient_name, recipient_tel);
  mutation.mutate({ user_id, username, recipient_name, recipient_tel, address, address_detail, zip_code, order_request, order_items: [orderItem],});
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

            <FormLabel>받는분 정보</FormLabel>
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
          <Text fontSize="lg">결제금액</Text>
          <Text>상품금액: {productPrice?.toLocaleString()}원</Text>
          <Text>배송비: {shippingFee.toLocaleString()}원</Text>
          <Text>결제예정금액: {totalAmount.toLocaleString()}원</Text>
        </Box>        
        <Box>
          <Text fontSize="lg" mb={2}>결제방법</Text>
          <RadioGroup defaultValue="bankTransfer">
            <Radio value="bankTransfer">무통장입금</Radio>
            <Radio value="creditCard">신용카드</Radio>
            <Radio value="samsungPay">삼성페이</Radio>
          </RadioGroup>
        </Box>

        <Button 
        colorScheme="red" 
        size="lg"
        isLoading={mutation.isLoading}
        type="submit"
        >
          {totalAmount.toLocaleString()}원 결제하기
        </Button>
      </VStack>
    </Center>
  );
}