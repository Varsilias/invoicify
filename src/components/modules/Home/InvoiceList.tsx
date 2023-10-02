import { Link } from "react-router-dom";
import StatusButton from "../../general/buttons/StatusButton";
import { formatDate } from "../../../utils";
import InvoiceRecordSkeleton from "../../general/skeletons/InvoiceRecordSkeleton";
import NoInvoice from "./NoInvoice";

const InvoiceList = ({
  isLoading = true,
  invoices = [],
}: {
  isLoading: boolean;
  invoices: Array<Record<string, string>>;
}) => {
  if (isLoading) {
    return (
      <div className="pb-20 md:pb-40">
        {[1, 2, 3, 4, 5].map((num) => (
          <div key={num} className="mb-4">
            <InvoiceRecordSkeleton />
          </div>
        ))}
      </div>
    );
  }

  return invoices.length > 0 ? (
    <div className="pb-20 md:pb-40">
      {invoices.map((invoice) => (
        <Link
          key={invoice.publicId}
          to={`/invoice/${invoice.publicId}`}
          className="px-6 md:px-4 cursor-pointer bg-white grid grid-cols-2 items-center dark:bg-invoicify-03 mb-4 md:flex md:flex-wrap md:justify-around py-5 last:mb-0"
        >
          <h4 className="basis-auto grow md:grow-0">
            <span className="text-invoicify-07">#</span>
            <span className="text-sm-variant dark:text-white">
              {invoice.invoiceId}
            </span>
          </h4>

          <h4 className="text-body text-[#858BB2] text-right md:text-left dark:text-white">
            {invoice.clientName}
          </h4>

          <h4 className="text-body hidden md:block text-[#858BB2] basis-auto">{`Due ${formatDate(
            invoice.paymentDue,
          )}`}</h4>

          <h4 className="text-sm space-x-0.5 dark:text-white mt-6 md:mt-0">
            <div className="md:hidden text-body text-[#858BB2]">{`Due ${formatDate(
              invoice.paymentDue,
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
  ) : (
    <NoInvoice />
  );
};

export default InvoiceList;
