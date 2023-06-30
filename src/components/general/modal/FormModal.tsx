import { PropsWithChildren } from "react";
import Portal from "./Portal";

const FormModal: React.FC<
  PropsWithChildren<{
    showModal: boolean;
    onClick: (e: any) => void;
  }>
> = ({ children, showModal, onClick }) => {
  return (
    showModal && (
      <Portal>
        <div
          className="fixed lg:inset-y-0 lg:right-0 lg:left-[73px] md:inset-x-0 md:bottom-0 md:top-[72px] bg-black bg-opacity-25 backdrop-blur-sm"
          onClick={onClick}
        >
          <>{children}</>
        </div>
      </Portal>
    )
  );
};

export default FormModal;
