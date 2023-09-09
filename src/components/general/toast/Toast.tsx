import { PropsWithChildren } from "react";
import { useToastIcon } from "../../../hooks/useToastIcon";

export type ToastType = "error" | "alert" | "information" | "success";

interface Props {
  type?: ToastType;
}

export const Toast = ({
  children,
  type = "information",
}: PropsWithChildren<Props>) => {
  const icon = useToastIcon(type);

  return (
    <div className="toast flex align-middle">
      <span className="mr-[18px]">{icon}</span>
      <div className="text-sm">
        <h3 className="font-medium capitalize text-black-100">{type}</h3>
        <p className="mt-1  text-black-60">{children}</p>
      </div>
    </div>
  );
};
