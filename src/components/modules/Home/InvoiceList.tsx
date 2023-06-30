import data from "../../../../data.json";
import { Link } from "react-router-dom";
import StatusButton from "../../general/buttons/StatusButton";
import { formatDate } from "../../../utils";

const InvoiceList = () => {
  return (
    <div className="pb-20 md:pb-40">
      {data.map((invoice) => (
        <Link
          key={invoice.id}
          to={`/invoice/${invoice.id}`}
          className="px-6 md:px-4 cursor-pointer bg-white grid grid-cols-2 items-center dark:bg-invoicify-03 mb-4 md:flex md:flex-wrap md:justify-around py-5 last:mb-0"
        >
          <h4 className="basis-auto grow md:grow-0">
            <span className="text-invoicify-07">#</span>
            <span className="text-sm-variant dark:text-white">
              {invoice.id}
            </span>
          </h4>

          <h4 className="text-body text-[#858BB2] text-right md:text-left dark:text-white">
            {invoice.clientName}
          </h4>

          <h4 className="text-body hidden md:block text-[#858BB2] basis-auto">{`Due ${formatDate(
            invoice.paymentDue
          )}`}</h4>

          <h4 className="text-sm space-x-0.5 dark:text-white mt-6 md:mt-0">
            <div className="md:hidden text-body text-[#858BB2]">{`Due ${formatDate(
              invoice.paymentDue
            )}`}</div>
            <div>
              <span>£</span>
              <span>{invoice.total}</span>
            </div>
          </h4>

          <h4 className="text-right md:text-left mt-6 md:mt-0">
            <StatusButton text={invoice.status} />
          </h4>

          <div className="hidden md:block">
            <svg
              width="7"
              height="10"
              viewBox="0 0 7 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1 1L5 5L1 9" stroke="#7C5DFA" strokeWidth="2" />
            </svg>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default InvoiceList;
