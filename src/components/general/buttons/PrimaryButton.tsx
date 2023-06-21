import { PropsWithChildren } from "react";

export interface IPrimaryButtonProps {
  className?: string;
  text?: string;
}

const PrimaryButton = ({
  className,
  text,
  children,
}: PropsWithChildren<IPrimaryButtonProps>) => {
  return (
    <div>
      <button
        className={`${className} text-sm-variant text-invoicify-05 rounded-3xl`}
      >
        {text ? text : children}
      </button>
    </div>
  );
};

export default PrimaryButton;
