import { PropsWithChildren } from "react";
import { FaSpinner } from "react-icons/fa";

export interface IPrimaryButtonProps {
  className?: string;
  text?: string;
  type?: "button" | "submit" | "reset";
  onClick?: (e?: React.MouseEvent) => void;
  isLoading?: boolean;
  disabled?: boolean;
}

const PrimaryButton = ({
  className,
  text,
  children,
  type,
  isLoading = false,
  onClick,
  disabled = false,
}: PropsWithChildren<IPrimaryButtonProps>) => {
  return (
    <div>
      <button
        className={`${className} ${
          disabled ? "cursor-not-allowed" : "cursor-pointer"
        } text-sm-variant text-invoicify-05 rounded-3xl flex space-x-2`}
        onClick={onClick}
        type={type}
        disabled={disabled}
      >
        {isLoading ? (
          <span>
            <FaSpinner className="spinner" />
          </span>
        ) : null}
        <span>{text ? text : children}</span>
      </button>
    </div>
  );
};

export default PrimaryButton;
