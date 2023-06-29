import { PropsWithChildren } from "react";
import Navbar from "./Navbar";
import SideNavBar from "./SideNavBar";

const MainLayout = ({
  children,
  isForm,
}: PropsWithChildren<{ isForm?: boolean }>) => {
  return (
    <div
      className={`h-full ${
        isForm ? "bg-white" : "bg-invoicify-11"
      } dark:bg-invoicify-12 lg:flex lg:flex-col lg:grow`}
    >
      <Navbar />
      <div className="lg:flex">
        <div className="lg:fixed lg:block hidden">
          <SideNavBar />
        </div>
        <main className="px-6 md:mx-[100px] lg:mx-[200px] xl:mx-[250px] lg:w-full">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
