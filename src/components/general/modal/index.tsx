import { PropsWithChildren } from "react";
import Portal from "./Portal";

const Modal: React.FC<
  PropsWithChildren<{
    showModal: boolean;
    onClick: (e: any) => void;
  }>
> = ({ children, showModal, onClick }) => {
  return (
    showModal && (
      <Portal>
        <div
          className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-25 backdrop-blur-sm"
          onClick={onClick}
        >
          <>{children}</>
        </div>
      </Portal>
    )
  );
};

export default Modal;
