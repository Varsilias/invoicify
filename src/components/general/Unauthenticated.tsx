import { Link } from "react-router-dom";

const Unauthenticated = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center w-full space-y-4">
        <h1 className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#AB3882]/100 via-[#ED2B30]/100 to-[#F79420]/100">
          Oops!
        </h1>
        <h3 className="text-xl font-black text-sidebar-primary uppercase">
          Unauthorised
        </h3>
        <div className="text-base font-semibold space-y-0">
          <p className="pb-8">We were not able to verify your identity.</p>
          <Link
            to="/auth/login"
            className="whitespace-nowrap rounded-full cursor-pointer px-4 py-4 text-white bg-gradient-to-r from-[#AB3882]/100 via-[#ED2B30]/100 to-[#F79420]/100"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Unauthenticated;
