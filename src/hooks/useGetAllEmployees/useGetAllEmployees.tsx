import { useEffect } from "react";
import { useQuery } from "react-query";

import { EmployeeAPI } from "src/apis/API";
import { setAllEmployees } from "src/store";
import { useAppDispatch, useAppSelector } from "src/store/hooks";

export const useGetAllEmployees = () => {
  const dispatch = useAppDispatch();
  const { employees, roles, shopId } = useAppSelector((state) => {
    return {
      employees: state.employee.allEmployees,
      roles: state.employee.activeEmployee.role,
      shopId: state.employee.activeEmployee.shopId,
    };
  });
  const { data, isLoading } = useQuery(["getAllEmployees", employees], () => {
    if (shopId) {
      return EmployeeAPI.getAllEmployees(shopId);
    }
  });

  useEffect(() => {
    if (data?.users) {
      dispatch(setAllEmployees(data?.users));
    }
  }, [data, dispatch]);

  return {
    employees,
    roles,
    isLoading,
  };
};
