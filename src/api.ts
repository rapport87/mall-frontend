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

export const getOrders = async ({ queryKey }: QueryFunctionContext) => {
  const [_, username] = queryKey;
  try {
    const response = await instance.get(`orders/${username}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
  }
};


export const getOrderDetail = async ({ queryKey }: QueryFunctionContext) => {
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