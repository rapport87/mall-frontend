import {
    Box, Flex,
  } from "@chakra-ui/react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
  import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
  
  export default function Root() {
    return (
    <Flex direction="column" minHeight="100vh">
      <Box mb={"5"} flex="1">
        <Header />
        <Outlet />
        <ReactQueryDevtools />
      </Box >
      <Footer />
    </Flex>      
    );
  }