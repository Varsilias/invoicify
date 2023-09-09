import { Outlet } from "react-router-dom";
import Navbar from "../general/Navbar";

const AuthLayout = () => {
  return (
    <div className={`min-h-screen bg-invoicify-11 dark:bg-invoicify-12`}>
      <Navbar />
      <div className="lg:flex">
        <main className="h-full px-6 md:mx-[100px] lg:mx-[200px] xl:mx-[250px] lg:w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AuthLayout;
