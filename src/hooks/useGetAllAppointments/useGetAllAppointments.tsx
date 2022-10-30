import axios from "axios";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { setAppointmentsList } from "src/store";
import { useAppDispatch } from "src/store/hooks";

export const useGetAllAppointments = (rangeQuery: string) => {
  const dispatch = useAppDispatch();
  const { data, isLoading } = useQuery(
    [
      "appointment/get-all-appointments",
      // Dont refecht data in the same month selected
      rangeQuery,
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
  useEffect(() => {
    if (!isLoading && data?.data?.allAppointments) {
      dispatch(setAppointmentsList(data?.data?.allAppointments));
    }
  }, [isLoading, data]);

  return {
    isLoading,
    data,
  };
};

export default useGetAllAppointments;
