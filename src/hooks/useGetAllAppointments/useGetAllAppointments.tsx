import axios from "axios";
import { useQuery } from "react-query";

export const useGetAllAppointments = (rangeQuery: string) => {
  const { data, isLoading } = useQuery(
    [
      "checkAuth",
      // Dont refecht data in the same month selected
      rangeQuery.substring(0, 7),
    ],
    async () => {
      return await axios.get("/.netlify/functions/get-all-appointments", {
        headers: {
          shopId: "gao-vegan0410940",
          rangeQuery,
        },
      });
    }
  );

  return {
    isLoading,
    data,
  };
};

export default useGetAllAppointments;
