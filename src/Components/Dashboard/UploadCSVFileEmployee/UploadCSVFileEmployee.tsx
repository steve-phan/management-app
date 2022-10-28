import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload } from "antd";

import { AppModal } from "src/Components/shared/UI/AppModal/AppModal";
import { useUploadCSVFileEmployee } from "src/hooks";
import { toggleUploadCSVFILEEMPLOYEEModal } from "src/store";

export const UploadCSVFileEmployee = ({ open }: { open: boolean }) => {
  const { handleUpload, upLoadprops } = useUploadCSVFileEmployee();

  return (
    <AppModal
      open={open}
      toggleModal={toggleUploadCSVFILEEMPLOYEEModal}
      title="Upload CSV file Employees"
      showModalFooter
      onOk={handleUpload}
    >
      <Upload {...upLoadprops}>
        <Button icon={<UploadOutlined />}>Click to select</Button>
      </Upload>
    </AppModal>
  );
};
