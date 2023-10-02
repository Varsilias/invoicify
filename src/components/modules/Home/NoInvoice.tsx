import noinvoice from "../../../assets/no-invoice.png";

const NoInvoice = () => {
  return (
    <div className="flex w-full h-screen items-center justify-center">
      <div>
        <div className="mb-[42px]">
          <img src={noinvoice} alt="No Invoice" />
        </div>

        <div className="text-center">
          <h1 className="text-base mb-6 dark:text-white">
            There is nothing here
          </h1>

          <p className="text-body text-invoicify-06">
            Create an invoice by clicking the
          </p>
          <p className="text-body text-invoicify-06">
            <span className="font-bold leading-[15px] text-[13px]">New</span>{" "}
            button and get started
          </p>
        </div>
      </div>
    </div>
  );
};

export default NoInvoice;
