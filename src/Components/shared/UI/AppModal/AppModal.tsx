import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { Modal } from "antd";

import { useAppDispatch } from "src/store/hooks";

import "./AppModal.css";

export interface IAppModalProps {
  title: React.ReactNode;
  open: boolean;
  toggleModal: ActionCreatorWithPayload<any, string>;
  children: JSX.Element;
  showModalFooter?: boolean;
  onOk?: () => void;
  onCancel?: () => void;
  width?: number;
  height?: number;
}

export const AppModal = ({
  open,
  title,
  toggleModal,
  children,
  showModalFooter = false,
  onOk = () => {},
  width = 520,
  onCancel,
  height = 100,
}: IAppModalProps) => {
  const dispatch = useAppDispatch();

  const handleCancel = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation();

    dispatch(toggleModal(false));
    if (onCancel) {
      onCancel();
    }
  };
  const handleOk = () => {
    onOk();
  };

  return (
    <Modal
      style={{
        height: height,
        maxHeight: "80vh",
      }}
      className="bookable24-appmodal"
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
