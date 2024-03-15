import Cookie from "js-cookie"
import { QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";

const instance = axios.create({
  baseURL: 
    process.env.NODE_ENV === "development" 
    ? "http://127.0.0.1:8000/api/v1/"
    : "https://mall.learninglab.co.kr:15152/api/v1",
  withCredentials: true,
});

export const getProducts = async () => {
  try {
    const response = await instance.get("products/");
    return response.data;
  } catch (error) {
    console.error("상품을 불러오던 중 오류가 발생하였습니다 :", error);
  }
};

export const getCategoryProducts = async ({queryKey}: QueryFunctionContext) => {
  const [_, categoryId] = queryKey
  try {
    const response = await instance.get(`cate/${categoryId}`);
    return response.data;
  } catch (error) {
    console.error("상품을 불러오던 중 오류가 발생하였습니다 :", error);
  }
};

export const getProductDetail = async ({ queryKey }: QueryFunctionContext) => {
  const [_, productId] = queryKey;
  try {
    const response = await instance.get(`products/${productId}`);
    return response.data;
  } catch (error) {
    console.error(`상품 상세페이지를 불러오던 중 오류가 발생하였습니다 : ${productId}`, error);
  }
};

export const getOrderHistory = async ({ queryKey }: QueryFunctionContext) => {
  const [_, username] = queryKey;
  try {
    const response = await instance.get(`orders/${username}`);
    return response.data;
  } catch (error) {
    console.error("주문을 불러오던 중 오류가 발생하였습니다 : ", error);
  }
};


export const getOrderHistoryDetail = async ({ queryKey }: QueryFunctionContext) => {
  const [_, username, orderId] = queryKey;
  try {
    const response = await instance.get(`orders/${username}/${orderId}`);
    return response.data;
  } catch (error) {
    console.error("주문을 불러오던 중 오류가 발생하였습니다 : ", error);
  }
};

export const getProfile = async () => {
  try {
    const response = await instance.get(`users/profile`);
    return response.data;
  } catch (error) {
    
  }
};

export interface IuserSignUpProp{
  name : string;
  email : string;
  username : string;
  password : string;
};

export const userSignUp = async ({ username, password, email, name }: IuserSignUpProp) => {
    try {
        const response = await instance.post(
            "/users/signup",
            { username, password, email, name },
            {
                headers: {
                    "X-CSRFToken": Cookie.get("csrftoken") || "",
                },
            }
        );
        return response.data; 
    } catch (error) {
        console.error("회원가입중 오류가 발생하였습니다 :", error);
        throw error; 
    }
};


    
export const kakaoLogin = async (code: string) => {
  try {
    const response = await instance.post(
      `/users/kakao`,
      { code },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    );
    return response.status;
  } catch (error) {
    console.error("카카오 로그인중 오류가 발생하였습니다 :", error);
  }
};

export const logOut = async () => {
  try {
    const response = await instance.post(`users/log-out`, null, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    });
    return response.data;
  } catch (error) {
    console.error("로그아웃중 오류가 발생하였습니다 :", error);
  }
};

export interface IUsernameLoginVariables {
  username: string;
  password: string;
}
export interface IUsernameLoginSuccess {
  ok: string;
}
export interface IUsernameLoginError {
  error: string;
}

export const usernameLogIn = ({
  username,
  password,
}: IUsernameLoginVariables) =>
  instance
    .post(
      `/users/log-in`,
      { username, password },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);

export interface IOrderItem {
  product_id: number;
  product_name: string;
  sale_price: number;
  quantity: number;
  thumbnail: string;
}

export const createOrder = async (orderData: {
  user_id: number;
  username: string;
  recipient_name: string;
  recipient_tel: string;
  address: string;
  address_detail: string;
  zip_code: number;
  order_request: string;
  order_items:  IOrderItem[];
  payment: number;
  shipping_fee : number;
}) => {
  try {
    const response = await instance.post("orders/create/", orderData, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    });
    return response.data;
  } catch (error) {
    console.error("주문 생성중 오류가 발생하였습니다 :", error);
    throw error; 
  }
};    

export const getCarts = async () => {
  try {
    const response = await instance.get("carts/");
    return response.data;
  } catch (error) {
    console.error("장바구니를 불러오던중 오류가 발생하였습니다 :", error);
  }
};

export const addToCart = async (productPk: number, quantity: number) => {
  try {
    const response = await instance.post("carts/", {
      product_id: productPk,
      quantity: quantity
    }, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      }
    });
    alert("상품이 장바구니에 추가되었습니다");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      if (error.response.status === 400) {
        alert(error.response.data.message);
      } else {
        console.error("상품을 추가하던 중 오류가 발생하였습니다 :", error.response);
      }
    } else {
      console.error("상품을 추가하던 중 오류가 발생하였습니다 :", error);
    }
    throw error;
  }
};

export const deleteCartItem = async (cartItemId: number) => {
  try {
    const response = await instance.delete(`carts/${cartItemId}/`, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      }
    });
    alert("상품이 장바구니에서 삭제되었습니다");
    return response.data;
  } catch (error) {
    console.error("상품을 삭제하던 중 오류가 발생하였습니다 :", error);
    throw error;
  }
};


export const clearCart = async () => {
  try {
    await instance.delete("carts/", {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      }
    });
  } catch (error) {
    console.error("장바구니를 비우던 중 오류가 발생하였습니다 :", error);
    throw error;
  }
};