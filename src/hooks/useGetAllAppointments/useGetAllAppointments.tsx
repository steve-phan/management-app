import axios from "axios";
import { useQuery } from "react-query";

export const useGetAllAppointments = (monthQuery: string) => {
  const { data, isLoading } = useQuery(["checkAuth", monthQuery], async () => {
    return await axios.get("/.netlify/functions/get-all-appointments", {
      headers: {
        shopId: "gao-vegan0410940",
        monthQuery,
      },
    });
  });

  return {
    isLoading,
    data,
  };
};

export default useGetAllAppointments;
