import React from 'react';
import { Box, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { IReceiverInfoProps } from "../types"

export default function ReceiverInfo() {
  return (
    <Box>
      <FormControl isRequired>
        <FormLabel>받는분 성함</FormLabel>
        <Input type="text" placeholder="이름" />
        <FormLabel>받는분 연락처</FormLabel>
        <Input type="text" placeholder="연락처" />        
        <FormLabel>주소</FormLabel>
        <Input type="text" placeholder="주소" />
        <FormLabel>상세주소</FormLabel>
        <Input type="text" placeholder="상세주소" />
        <FormLabel>우편번호</FormLabel>
        <Input type="text" placeholder="우편번호" />
      </FormControl>
    </Box>
  );
}