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
    useToast,
  } from "@chakra-ui/react";
  import { FaUserNinja, FaLock, FaEnvelope, FaUserSecret } from "react-icons/fa";
  import SocialLogin from "./SocialLogin";
import { useForm } from "react-hook-form";
import { AxiosError } from "axios";
import { userSignUp } from "../api"
import { useMutation, useQueryClient } from "@tanstack/react-query";
  
  interface SignUpModalProps {
    isOpen: boolean;
    onClose: () => void;
  }
  
  interface ISignUpForm{
    username: string;
    password : string;
    name : string;
    email : string;
  }

  export default function SignUpModal({ isOpen, onClose }: SignUpModalProps) {
    const { 
      register,
      handleSubmit,
      formState: { errors },
      reset,
    } = useForm<ISignUpForm>();

    const toast = useToast();
    const queryClient = useQueryClient();

    const mutation = useMutation(userSignUp, {
        onMutate: () => {
            console.log("start to mutate");
        },

        onError: (error: AxiosError) => {
            console.log("error occurred");
            console.log(error.response?.data);

            const error_message = Object.values(
                error.response?.data as Object
            )[0];
            console.log(error_message);

            toast({
                status: "error",
                title: "Sign Up Failed",
                description: error_message,
            });
        },

        onSuccess: () => {
            toast({
                status: "success",
                title: "Sign Up Successed!",
                description: "Nice to meet you! 😎",
            });
            queryClient.refetchQueries(["profile"]);
            onClose();
        },
    });    

    function onSignUpSubmit({
      name,
      username,
      email,
      password,
    }: ISignUpForm) {
        mutation.mutate({ name, username, email, password });
        reset();
    }    

    return (
      <Modal onClose={onClose} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>회원가입</ModalHeader>
          <ModalCloseButton />
          <ModalBody as={"form"} onSubmit={handleSubmit(onSignUpSubmit)}>
            <VStack>
              <InputGroup>
                <InputLeftElement
                  children={
                    <Box color="gray.500">
                      <FaUserSecret />
                    </Box>
                  }
                />
                <Input 
                  variant={"filled"}                 
                  placeholder="ID"                  
                  {...register("name", {
                    required: "ID는 필수입니다!",
                  })}
                />
              </InputGroup>
              <InputGroup>
                <InputLeftElement
                  children={
                    <Box color="gray.500">
                      <FaEnvelope />
                    </Box>
                  }
                />
                <Input 
                variant={"filled"} 
                placeholder="Email"
                {...register("email", {
                    required: "E-mail 주소는 필수입니다!",
                })}                
                />
              </InputGroup>
              <InputGroup>
                <InputLeftElement
                  children={
                    <Box color="gray.500">
                      <FaUserNinja />
                    </Box>
                  }
                />
                <Input 
                variant={"filled"} 
                placeholder="Username"
                {...register("username", {
                    required: "사용자 이름은 필수입니다!",
                })}
                />
              </InputGroup>
              <InputGroup>
                <InputLeftElement
                  children={
                    <Box color="gray.500">
                      <FaLock />
                    </Box>
                  }
                />
                <Input 
                variant={"filled"} 
                type="password"
                placeholder="Password" 
                {...register("password", {
                    required: "비밀번호는 필수입니다!",
                })}                
                />           
              </InputGroup>
            </VStack>
            <Button
            isLoading={mutation.isLoading}
            type="submit"
            mt={4}
            colorScheme={"red"}
            w={"100%"}
            >
              회원가입
            </Button>
            <SocialLogin />
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  }