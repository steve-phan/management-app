import { AppModal } from "src/Components/shared/UI/AppModal/AppModal";
import { toggleEditEmployeeModal } from "src/store";

import { EditEableForm } from "./EditEableForm";

export const EditEmployee = ({ open }: { open: boolean }) => {
  return (
    <AppModal
      open={open}
      toggleModal={toggleEditEmployeeModal}
      title="Edit Employee"
    >
      <EditEableForm />
    </AppModal>
  );
};
