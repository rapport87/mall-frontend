import { MdFoodBank } from "react-icons/md";
import {
  Avatar,
  Box,
  Button,
  HStack,
  LightMode,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";
import useUser from "../lib/useUser";
import { logOut } from "../api";
import { useQueryClient } from "@tanstack/react-query";

export default function Header() {
  const { userLoading, isLoggedIn, user } = useUser();  
  const {
    isOpen: isLoginOpen,
    onClose: onLoginClose,
    onOpen: onLoginOpen,
  } = useDisclosure();
  const {
    isOpen: isSignUpOpen,
    onClose: onSignUpClose,
    onOpen: onSignUpOpen,
  } = useDisclosure();
  const toast = useToast();
  const queryClient = useQueryClient();  
  const onLogOut = async () => {
    const toastId = toast({
      title: "로그아웃",
      description: "로그아웃중 입니다.",
      status: "loading",
      position: "bottom-right",
    });
    await logOut();
    queryClient.refetchQueries({ queryKey: ['profile'] });
    toast.update(toastId, {
      status: "success",
      title: "로그아웃 완료",
      description: "또 방문 해 주세요!",
    });
  };  
  return (
    <Stack
      justifyContent={"space-between"}
      alignItems="center"
      py={5}
      px={40}
      direction={{
        sm: "column",
        md: "row",
      }}
      spacing={{
        sm: 4,
        md: 0,
      }}
      borderBottomWidth={1}
    >
      <Box color="tomato">
          <Link to={"/"}>
              <MdFoodBank size={"60"} />
          </Link>
      </Box>
      <HStack spacing={2}>
        {!userLoading ?(
          !isLoggedIn ? (
            <>

        <Button onClick={onLoginOpen}>로그인</Button>
        <LightMode>
          <Button onClick={onSignUpOpen} colorScheme={"red"}>
            회원가입
          </Button>
        </LightMode>
        </>
          ) : (
            <Menu>
              <MenuButton>
                <Avatar name={user?.name} size={"md"} />
              </MenuButton>
              <MenuList>
                <MenuItem as={Link} to={`/order/${user?.username}`}>주문내역</MenuItem>
                <MenuItem onClick={onLogOut}>로그아웃</MenuItem>
              </MenuList>
            </Menu>
          )
        ) : null}

      </HStack>
      <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
      <SignUpModal isOpen={isSignUpOpen} onClose={onSignUpClose} />
    </Stack>
  );
}