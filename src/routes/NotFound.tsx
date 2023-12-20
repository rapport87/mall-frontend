import { Button, Heading, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function NotFound(){
    return (
        <VStack>
            <Heading>페이지를 찾을 수 없습니다</Heading>
            <Text>홈으로 돌아가세요</Text>
            <Link to="/">
                <Button>홈으로 돌아가기</Button>
            </Link>
        </VStack>
    );
}