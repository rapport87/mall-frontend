import Cookie from "js-cookie"
import { QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/",
  withCredentials: true,
});

export const getProducts = async () => {
  try {
    const response = await instance.get("products/");
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

export const getProductDetail = async ({ queryKey }: QueryFunctionContext) => {
  const [_, productPk] = queryKey;
  try {
    const response = await instance.get(`products/${productPk}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product detail: ${productPk}`, error);
  }
};

export const getOrderHistory = async ({ queryKey }: QueryFunctionContext) => {
  const [_, username] = queryKey;
  try {
    const response = await instance.get(`orders/${username}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
  }
};


export const getOrderHistoryDetail = async ({ queryKey }: QueryFunctionContext) => {
  const [_, username, order_id] = queryKey;
  try {
    const response = await instance.get(`orders/${username}/${order_id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching order detail:", error);
  }
};

export const getProfile = async () => {
  try {
    const response = await instance.get(`users/profile`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
  }
};

export interface IuserSignUpProp{
  name : string;
  email : string;
  username : string;
  password : string;
};

export const userSignUp = async ({
  name,
  email,
  username,
  password,
}:IuserSignUpProp) => {
  try {
    const response = await instance.post(
      `/users/signup`, 
    { name, email, username, password }, 
    {
      headers: {
        "X-CSRFToken" : Cookie.get("csrftoken") || "",
      },
    });
    return response.data;
  } catch (error){
    console.error("Error during Sign up:", error);
  }
}
    
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
      console.error("Error during Kakao login:", error);
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
    console.error("Error during log out:", error);
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
    console.error("Error creating order:", error);
    throw error; 
  }
};    

export const getCarts = async () => {
  try {
    const response = await instance.get("carts/");
    return response.data;
  } catch (error) {
    console.error("Error fetching carts:", error);
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
    // AxiosError 타입으로 타입 가드를 사용
    if (axios.isAxiosError(error) && error.response) {
      if (error.response.status === 400) {
        alert(error.response.data.message);
      } else {
        // 기타 HTTP 오류 처리
        console.error("Error adding to cart:", error.response);
      }
    } else {
      // Axios 오류가 아닌 기타 오류 처리
      console.error("Error adding to cart:", error);
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
    console.error("Error deleting cart item:", error);
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
    console.error("Error clearing cart:", error);
    throw error;
  }
};