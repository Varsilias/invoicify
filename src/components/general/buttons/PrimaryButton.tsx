import { PropsWithChildren } from "react";

export interface IPrimaryButtonProps {
  className?: string;
  text?: string;
  type?: "button" | "submit" | "reset";
  onClick?: (e?: React.MouseEvent) => void;
}

const PrimaryButton = ({
  className,
  text,
  children,
  type,
  onClick,
}: PropsWithChildren<IPrimaryButtonProps>) => {
  return (
    <div>
      <button
        className={`${className} text-sm-variant text-invoicify-05 rounded-3xl`}
        onClick={onClick}
        type={type}
      >
        {text ? text : children}
      </button>
    </div>
  );
};

export default PrimaryButton;
