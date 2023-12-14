import {
    Box,
    Button,
    Input,
    InputGroup,
    InputLeftElement,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    VStack,
  } from "@chakra-ui/react";
  import { FaUserNinja, FaLock } from "react-icons/fa";
  import SocialLogin from "./SocialLogin";
  
  interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
  }
  
  export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
    return (
      <Modal onClose={onClose} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>로그인</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack>
              <InputGroup size={"md"}>
                <InputLeftElement
                  children={
                    <Box color="gray.500">
                      <FaUserNinja />
                    </Box>
                  }
                />
                <Input variant={"filled"} placeholder="Account" />
              </InputGroup>
              <InputGroup>
                <InputLeftElement
                  children={
                    <Box color="gray.500">
                      <FaLock />
                    </Box>
                  }
                />
                <Input variant={"filled"} placeholder="Password" />
              </InputGroup>
            </VStack>
            <Button mt={4} colorScheme={"red"} w="100%">
              로그인
            </Button>
            <SocialLogin />
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  }