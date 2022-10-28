import { EmployeeSignUp } from "src/Components/Account/EmployeeSignUp/EmployeeSignUp";
import { SignUpType } from "src/Components/Account/EmployeeSignUp/EmployeeSignUp.helpers";
import { AppModal } from "src/Components/shared/UI/AppModal/AppModal";
import { toggleAddEmployeeModal } from "src/store";

export const AddEmployee = ({ open }: { open: boolean }) => {
  return (
    <AppModal
      open={open}
      toggleModal={toggleAddEmployeeModal}
      title="Add a new employee"
    >
      <EmployeeSignUp type={SignUpType.ADD_EMPLOYEE} />
    </AppModal>
  );
};
