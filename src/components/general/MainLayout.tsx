import { PropsWithChildren } from "react";
import Navbar from "./Navbar";

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="h-screen bg-invoicify-11 dark:bg-invoicify-12">
      <Navbar />
      <main className="px-6">{children}</main>
    </div>
  );
};

export default MainLayout;
