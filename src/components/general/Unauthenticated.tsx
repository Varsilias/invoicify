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
        <p className="text-base font-semibold space-y-0">
          <span>We were not able to verify your identity,</span>
          <br />
          <span>please try again.</span>
        </p>
      </div>
    </div>
  );
};

export default Unauthenticated;
