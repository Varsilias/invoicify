import { PropsWithChildren } from "react";
import Navbar from "../general/Navbar";
import SideNavBar from "../general/SideNavBar";
import { useAuthContext } from "../../context";
import Unauthenticated from "../general/Unauthenticated";

const MainLayout = ({
  children,
  isForm,
}: PropsWithChildren<{ isForm?: boolean }>) => {
  const { isAuthenticated } = useAuthContext();

  return isAuthenticated ? (
    <div
      className={`min-h-screen ${
        isForm ? "bg-white" : "bg-invoicify-11"
      } dark:bg-invoicify-12 lg:flex lg:flex-col lg:grow`}
    >
      <div className="lg:hidden">
        <Navbar />
      </div>
      <div className="lg:flex">
        <div className="lg:fixed lg:block hidden">
          <SideNavBar />
        </div>
        <main className="h-full px-6 md:mx-[100px] lg:mx-[200px] xl:mx-[250px] lg:w-full">
          {children}
        </main>
      </div>
    </div>
  ) : (
    <Unauthenticated />
  );
};

export default MainLayout;
