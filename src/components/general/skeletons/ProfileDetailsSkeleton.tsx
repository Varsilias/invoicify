const ProfileDetailsSkeleton = () => {
  return (
    <div className="py-8 md:py-8 px-8 bg-white dark:bg-invoicify-03 mt-8 rounded-md animate-pulse">
      <h1 className=" bg-invoicify-11 dark:bg-invoicify-12 mb-8 h-10 rounded-full"></h1>
      <div>
        <div>
          <div className="flex items-center mb-3 w-full md:space-x-5 flex-wrap md:flex-nowrap">
            <div className="h-10 rounded-3xl bg-invoicify-11 dark:bg-invoicify-12 flex flex-col mb-4 md:basis-1/2 grow md:pr-0"></div>
            <div className="h-10 rounded-3xl bg-invoicify-11 dark:bg-invoicify-12 flex flex-col mb-4 md:basis-1/2 grow md:pl-0"></div>
          </div>

          <div className="flex items-center mb-3 w-full md:space-x-5 flex-wrap md:flex-nowrap">
            <div className="h-10 rounded-3xl bg-invoicify-11 dark:bg-invoicify-12 flex flex-col mb-4 md:basis-1/2 grow md:pr-0"></div>
            <div className="h-10 rounded-3xl bg-invoicify-11 dark:bg-invoicify-12 flex flex-col mb-4 md:basis-1/2 grow md:pl-0"></div>
          </div>

          <div className="flex items-center mb-3 w-full md:space-x-5 flex-wrap md:flex-nowrap">
            <div className="h-10 rounded-3xl bg-invoicify-11 dark:bg-invoicify-12 flex flex-col mb-4 md:basis-1/2 grow md:pr-0"></div>
            <div className="h-10 rounded-3xl bg-invoicify-11 dark:bg-invoicify-12 flex flex-col mb-4 md:basis-1/2 grow md:pl-0"></div>
          </div>
          <div className="flex items-center mb-3 w-full md:space-x-5 flex-wrap md:flex-nowrap">
            <div className="h-10 rounded-3xl bg-invoicify-11 dark:bg-invoicify-12 flex flex-col mb-4 md:basis-1/2 grow md:pr-0"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetailsSkeleton;
