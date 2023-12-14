import { useQuery } from "@tanstack/react-query";
import { getProductDetail } from "../api";
import { IProductDetail } from "../types"
import { useParams } from "react-router-dom";
import { Box, Image } from "@chakra-ui/react";

export default function ProductDetail(){
    const { productPk } = useParams();
    const { isLoading, data } = useQuery<IProductDetail>({
        queryKey:["products", productPk],
        queryFn:getProductDetail,
      });
    return (
        <Box
            pb={40}
            mt={10}
            px={{
                base: 10,
                lg: 40,
            }}
        >
            {data?.name}
            <Image w="20%" h="20%" src={data?.images[0].photo}/>
            <Image w="20%" h="20%" src={data?.images[1].photo}/>
            <Image w="20%" h="20%" src={data?.images[2].photo}/>
        </Box>
    );
}