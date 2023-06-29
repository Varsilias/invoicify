import { PropsWithChildren } from "react";
import Navbar from "./Navbar";

const MainLayout = ({
  children,
  isForm,
}: PropsWithChildren<{ isForm?: boolean }>) => {
  return (
    <div
      className={`h-full ${
        isForm ? "bg-white" : "bg-invoicify-11"
      } dark:bg-invoicify-12`}
    >
      <Navbar />
      <main className="px-6 md:mx-[100px] lg:mx-[200px] xl:mx-[250px]">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
