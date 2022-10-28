import { AppModal } from "src/Components/shared/UI/AppModal/AppModal";
import { useDeleteEmployee } from "src/hooks";
import { toggleDeleteEmployeeModal } from "src/store";

export const DeleteEmployee = ({ open }: { open: boolean }) => {
  const { handleDeleteEmployee, employeeFullname } = useDeleteEmployee();

  return (
    <AppModal
      open={open}
      toggleModal={toggleDeleteEmployeeModal}
      title="Are you sure want to delete this EMPLOYEE?"
      showModalFooter
      onOk={handleDeleteEmployee}
    >
      <>Employee: {employeeFullname}</>
    </AppModal>
  );
};
