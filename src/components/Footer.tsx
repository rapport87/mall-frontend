import { Box, Center, Container, Stack, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box w="100%" bg="gray.100" color="gray.700">
      <Container justifyContent={ "space-between" } alignItems="center" as={Stack} maxW={'6xl'} py={3}>
        <Stack direction={{ base: 'column', md: 'row' }} spacing={4} justify="space-between" align="center">
          <Text>© 2023. 한결. All rights reserved.</Text>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;