import { MdArrowDropDown, MdFoodBank, MdMenu } from "react-icons/md";
import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  LightMode,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  useBreakpointValue,
  useDisclosure,
  useToast,

} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";
import useUser from "../lib/useUser";
import { logOut } from "../api";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

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

  const isMobile = useBreakpointValue({ base: true, md: false });  

  type MenuItemType = {
    name: string;
    link: string;
    subMenu?: MenuItemType[];
  };
  
  const menuItems: MenuItemType[] = [
    { name: "전체상품", link: "/" },    
    { 
      name: "국물", 
      link: "/cate/6", 
      subMenu: [
        { name: "찌개류", link: "/cate/11" },
        { name: "탕류", link: "/cate/10" }
      ] 
    },
    { 
      name: "분식", 
      link: "/cate/7", 
      subMenu: [
        { name: "돈까스", link: "/cate/5" },
        { name: "떡볶이", link: "/cate/8" },
        { name: "만두", link: "/cate/9" }
      ] 
    },
    { name: "치킨", link: "/cate/2" },
  ];

  const [activeSubMenu, setActiveSubMenu] = useState<MenuItemType | null>(null);

  const handleMenuClick = (item: MenuItemType) => {
    if (item.subMenu && item.subMenu.length > 0) {
      setActiveSubMenu(activeSubMenu?.name === item.name ? null : item);
    }else {
      setActiveSubMenu(null);
    }
  };

  const MobileMenu = () => (
    <Flex justifyContent="flex-end">
      <Menu>
        <MenuButton as={Button} bg="white" size="lg">
          <MdMenu size="32px" />
        </MenuButton>
        <MenuList>
          {menuItems.map(item => (
            item.subMenu && item.subMenu.length > 0 ? (
              <MenuItem key={item.name} onClick={() => handleMenuClick(item)}>
                {item.name}
              </MenuItem>
            ) : (
              <Link 
                key={item.name} 
                to={item.link}
                onClick={() => setActiveSubMenu(null)} // 상태 업데이트 추가
              >
                <MenuItem>
                  {item.name}
                </MenuItem>
              </Link>
            )
          ))}
        </MenuList>
      </Menu>
    </Flex>
  );
  
  const DesktopMenu = () => {
    const menuButtonStyle = {
      width: "100px",
      fontWeight: "normal",
      backgroundColor: "transparent",
      _hover: { backgroundColor: "transparent" },
      _expanded: { backgroundColor: "transparent" }
    };

    return (
      <Flex justifyContent="flex-start" w="100%">
        {menuItems.map(item => (
          item.subMenu && item.subMenu.length > 0 ? (
            <Menu key={item.name}>
              <MenuButton as={Button} {...menuButtonStyle} rightIcon={<MdArrowDropDown />}>
                {item.name}
              </MenuButton>
              <MenuList>
                {item.subMenu.map(subItem => (
                  <MenuItem key={subItem.name} as={Link} to={subItem.link}>
                    {subItem.name}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
          ) : (
            <Box w="80px" key={item.name} p={2}>
              <Link to={item.link}>{item.name}</Link>
            </Box>
          )
        ))}
      </Flex>
    );
  };

  const HeaderContent = () => (
    <Box w="100%">
      <Flex justifyContent={ "space-between" } alignItems="center">
        {isMobile && (
          <Box flexShrink={0}>
            <MobileMenu />
          </Box>
        )}
        <Box textAlign={{ base: "center", md: "left" }}>
          <Link to="/">
            <MdFoodBank size="60" color="tomato" />
          </Link>
        </Box>
        <HStack px={3} spacing={2} flexShrink={0}>
          {!userLoading ? (
            !isLoggedIn ? (
              <>
                <Button onClick={onLoginOpen}>로그인</Button>
                <LightMode>
                  <Button onClick={onSignUpOpen} colorScheme="red">회원가입</Button>
                </LightMode>
              </>
            ) : (
              <Menu>
                <MenuButton>
                  <Avatar name={user?.name} size="md" />
                </MenuButton>
                <MenuList>
                  <MenuItem as={Link} to="/cart/">장바구니</MenuItem>
                  <MenuItem as={Link} to={`/order/${user?.username}`}>주문내역</MenuItem>
                  <MenuItem onClick={onLogOut}>로그아웃</MenuItem>
                </MenuList>
              </Menu>
            )
          ) : null}
        </HStack>
      </Flex>
      {isMobile && activeSubMenu?.subMenu && (
        <HStack mt={2} py={2} px={4}>
          {activeSubMenu.subMenu.map(subItem => (
            <Link key={subItem.name} to={subItem.link}>
              {subItem.name}
            </Link>
          ))}
        </HStack>
        )}          
    </Box>
  );

  return (
    <Stack>
      <Flex
        justifyContent={{ base: "space-between", md: "space-between" }}
        alignItems="center"
        py={5}
        px={{ base: 4, md: 40 }}
        w="100%"
      >
        <HeaderContent />
      </Flex>
      <Stack px={{ md: 40 }} w="100%">
        {!isMobile && <DesktopMenu />}
      </Stack>
      <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
      <SignUpModal isOpen={isSignUpOpen} onClose={onSignUpClose} />
    </Stack>
  );
}