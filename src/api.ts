import { QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/",
});

export const getProducts = () =>
  instance.get("products/").then((response) => response.data);

  export const getProductDetail = ({ queryKey } : QueryFunctionContext) => {
    const [_, productPk] = queryKey;
    return instance.get(`products/${productPk}`).then((response) => response.data);  
  };