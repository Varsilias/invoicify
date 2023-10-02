interface INoDataProps {
  leadingText?: string;
  bodyText?: string;
  ctaText?: string;
  onClick?: () => void;
}

const NoData: React.FC<INoDataProps> = ({
  leadingText = "No Invoices found",
  ctaText = "New invoice",
  bodyText = `You currently do not have any invoice data available, proceed to create a new invoice by clicking the New Invoice button`,
  onClick,
}) => {
  return (
    <div>
      <div className="flex justify-center items-center w-full p-10">
        <div className="text-center w-full space-y-4">
          <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#AB3882]/100 via-[#ED2B30]/100 to-[#F79420]/100">
            {leadingText}
          </h1>
          <p className="text-[15px] flex w-full justify-center">{bodyText}</p>
          <div>
            <button
              onClick={onClick}
              className="font-bold bg-sidebar-primary py-2 px-6 rounded-full uppercase text-white"
            >
              {ctaText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoData;
