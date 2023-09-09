import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center w-full space-y-4">
        <h1 className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#AB3882]/100 via-[#ED2B30]/100 to-[#F79420]/100">
          Oops!
        </h1>
        <h3 className="text-xl font-black text-sidebar-primary">
          404 - PAGE NOT FOUND
        </h3>
        <p className="text-[15px] space-y-0">
          <span>The page you are looking for might have been removed,</span>{" "}
          <br />
          <span> had its name changed or is temporaily unavailable</span>
        </p>
        <button
          className="font-bold bg-sidebar-primary py-2 px-6 rounded-full uppercase text-white"
          onClick={() => navigate("/")}
        >
          Go Home
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
