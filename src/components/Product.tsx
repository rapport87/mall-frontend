import { FaRegHeart, FaStar } from "react-icons/fa";
import {
  Box,
  Button,
  Grid,
  HStack,
  Image,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

interface IProductProps {
  pk : number;
  name : string;
  price : number;
  salePrice : number;
  thumbnail : string;
  displayStatus : string;
}

function formatNumber(number: number): string {
  return new Intl.NumberFormat().format(number);
}

export default function Product({
  pk, name, price, salePrice, thumbnail, displayStatus,
}:IProductProps) {
  const gray = useColorModeValue("gray.600", "gray.300");

  console.log(pk, name, price, salePrice, thumbnail, displayStatus);
  return (
    <VStack alignItems={"flex-start"}>
      <Link to={`../products/${pk}`}>
        <Box position="relative" overflow={"hidden"} mb={3} rounded="2xl">
          <Image
            minH="280"
            src={thumbnail}
          />
          <Button
            variant={"unstyled"}
            position="absolute"
            top={0}
            right={0}
            color="white"
          >
            <FaRegHeart size="20px" />
          </Button>
        </Box>
        <Box>
          <Grid gap={2} templateColumns={"8fr 1fr"}>
            <Text display={"block"} as="b" noOfLines={1} fontSize="md">
              {name}
            </Text>
            <HStack spacing={1} alignItems="center">
              <FaStar size={12} />
              <Text fontSize={"sm"}>5.0</Text>
            </HStack>
          </Grid>
        </Box>
        <Box>
          <HStack fontSize={"small"} spacing={1}>
            <Text color={"red.500"}>즉시할인가</Text>
            <Text>|</Text>
            <Text as="s" color={gray}>{formatNumber(price)}원</Text>
          </HStack>
          <Box color={"red.600"} as="b">{formatNumber(salePrice)}원</Box>
        </Box>
      </Link>
    </VStack>
  );
}