import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../api";
import { IUser } from "../types";

export default function useUser() {
  const { isLoading, data, isError  } = useQuery<IUser>({
    queryKey: ["profile"],
    queryFn: getProfile,
    retry: false,
    refetchOnWindowFocus: false,
});  
  return {
    userLoading: isLoading,
    user: data,
    isLoggedIn: !isError,
  };
}