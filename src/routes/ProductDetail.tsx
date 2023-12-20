import React, { useState, useEffect } from 'react';
import { useQuery } from "@tanstack/react-query";
import { getProductDetail } from "../api";
import { IProductDetail } from "../types";
import { useParams } from "react-router-dom";
import { Box, Grid, Image, VStack, useColorModeValue, Text, Button, HStack, Center, Spinner, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Divider, Alert, AlertIcon } from "@chakra-ui/react";

export default function ProductDetail() {
    const { productPk } = useParams();
    const { isLoading, data } = useQuery<IProductDetail>({
        queryKey: ["products", productPk],
        queryFn: getProductDetail,
    });

    const [selectedImage, setSelectedImage] = useState<string | undefined>();
    const [quantity, setQuantity] = useState(1); // 수량 상태

    // 데이터가 로드되었을 때 메인 이미지를 선택합니다.
    useEffect(() => {
        if (data) {
            setSelectedImage(data.thumbnail);
        }
    }, [data]);

    const gray = useColorModeValue("gray.600", "gray.300");

    const discountRate = data ? Math.round(((data.price - data.sale_price) / data.price) * 100) : 0;

    const isOutOfStock = data?.stock === 0; // 재고 여부 체크

    if (isLoading) {
        return <Center mt={10}><Spinner /></Center>;
    }

    // 메인 이미지를 작은 이미지 목록에 추가합니다.
    const allImages = [data?.thumbnail, ...(data?.images.map(img => img.photo) || [])];

    // 가격 포매팅 함수
    const formatPrice = (price: number) => {
      return new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(price);
    };

    return (
        <Center mt={10}>
            <VStack maxWidth="1000px" w="full" gap={6}>
                <Grid
                    templateColumns={{ base: "1fr", md: "3fr 2fr" }}
                    maxWidth="1200px"
                    gap={6}
                >
                    <Box>
                        <Image
                            borderRadius="lg"
                            objectFit={"cover"}
                            src={selectedImage}
                            boxSize="600px"
                        />
                        <HStack spacing={2} mt={4} justifyContent="center">
                            {allImages.map((image, index) => (
                                <Box
                                    key={index}
                                    as="button"
                                    onClick={() => setSelectedImage(image as string)}
                                    p={1}
                                    border="1px"
                                    borderColor={selectedImage === image ? "blue.500" : "gray.200"}
                                    borderRadius="md"
                                >
                                    <Image src={image as string} boxSize="50px" />
                                </Box>
                            ))}
                        </HStack>
                    </Box>
                    <VStack
                        justifyContent="left"
                        alignItems="left"
                        spacing={0}
                        p={5}
                    >
                        <Text fontWeight="bold" fontSize="xx-large" textTransform="uppercase">
                            {data?.name}
                        </Text>
                        <Text color={"gray.400"} fontWeight={"border"} fontSize="small">{data?.description}</Text>
                        <Divider my={4} sx={{borderColor: "gray.300" , borderWidth: "1px"}} />
                        
                            <HStack spacing={2}>
                                <Text color="black">
                                    {discountRate}%
                                </Text>
                                <Text color="gray.500" as="s" fontSize="sm">
                                  {formatPrice(data?.price || 0)}원
                                </Text>                            
                            </HStack>
                            <VStack spacing={3} alignItems="left">
                            <Text color="red.500" fontSize="xx-large" fontWeight="bold">
                                {formatPrice(data?.sale_price || 0)}원
                            </Text>             
                            
                            <Text color="gray.500" fontSize="sm">주문가능 수량: {isOutOfStock ? '품절' : `${data?.stock}개`}</Text>
                        
                            <HStack spacing={4} width="full">
                                <NumberInput 
                                size="sm" 
                                maxW={20} 
                                defaultValue={1} 
                                min={1} 
                                max={data?.stock} 
                                value={quantity} 
                                onChange={(valueString) => setQuantity(parseInt(valueString))}
                                isDisabled={isOutOfStock}
                                >
                                <NumberInputField />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                                </NumberInput>
                                <Button flex={1} variant="outline" colorScheme="blue" color="blue.500" isDisabled={isOutOfStock}>장바구니</Button>
                                <Button flex={1} colorScheme="blue" isDisabled={isOutOfStock}>{isOutOfStock ? '품절' : '구매하기'}</Button>
                            </HStack>  
                        </VStack>                    
                    </VStack>         
                </Grid>

                <Box width="full">
                    <Divider my={6} sx={{borderColor: "gray.300" , borderWidth: "1px"}} />
                    <Box p={5}>
                        <Center>
                            <div dangerouslySetInnerHTML={{ __html: data?.detailed_description || "" }}></div>
                        </Center>
                    </Box>
                </Box>              
            </VStack>   
        </Center>
    );
}