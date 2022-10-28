import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { Modal } from "antd";

import { useAppDispatch } from "src/store/hooks";

export interface IAppModalProps {
  title: string;
  open: boolean;
  toggleModal: ActionCreatorWithPayload<any, string>;
  children: JSX.Element;
  showModalFooter?: boolean;
  onOk?: () => void;
  width?: number;
}

export const AppModal = ({
  open,
  title,
  toggleModal,
  children,
  showModalFooter = false,
  onOk = () => {},
  width = 520,
}: IAppModalProps) => {
  const dispatch = useAppDispatch();

  const handleCancel = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation();

    dispatch(toggleModal(false));
  };
  const handleOk = () => {
    onOk();
  };

  return (
    <Modal
      width={width}
      title={title}
      open={open}
      onCancel={handleCancel}
      //   footer={!showModalFooter ? null : true}
      {...(!showModalFooter && { footer: null })}
      okText="Submit"
      onOk={handleOk}
      wrapClassName={showModalFooter ? "" : "dashboard-modal"}
    >
      {children}
    </Modal>
  );
};
