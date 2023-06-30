import data from "../../../../data.json";
import { Link, useNavigate } from "react-router-dom";
import StatusButton from "../../general/buttons/StatusButton";
import { formatDate } from "../../../utils";
import React, { useState, useEffect } from "react";
import useMediaQuery from "../../../hooks/useMediaQuery";
import PrimaryButton from "../../general/buttons/PrimaryButton";
import { AddNewIcon } from "../../icons";
import FormModal from "../../general/modal/FormModal";
import CreateInvoice from "./CreateInvoice";

const InvoiceListWithModal = () => {
  const navigate = useNavigate();
  const [showCreateInvoiceForm, setShowCreateInvoiceForm] = useState(true);

  useEffect(() => {
    document.body.style.overflow = showCreateInvoiceForm ? "hidden" : "";
  }, [showCreateInvoiceForm]);

  console.log({ showCreateInvoiceForm });

  const { breakpoint } = useMediaQuery();
  return (
    <section>
      <div className="my-8">
        <React.Fragment>
          <div className="flex items-center w-full">
            <div className="heading grow mr-4">
              <h1 className="text-invoicify-08 text-base dark:text-white mb-2">
                Invoices
              </h1>
              <p className="text-invoicify-06 text-body dark:text-invoicify-05">
                {breakpoint === "xs" || breakpoint === "sm"
                  ? `7 Invoices`
                  : `There are 7 Invoices`}
              </p>
            </div>

            <div>
              <div>
                <PrimaryButton className="bg-invoicify-01 py-[6px] pl-2 pr-3 flex items-center">
                  <AddNewIcon />
                  <span className="ml-2 text-white">
                    {breakpoint === "xs" || breakpoint === "sm"
                      ? `New`
                      : `New Invoice`}
                  </span>
                </PrimaryButton>
              </div>
            </div>
          </div>

          <FormModal
            showModal={showCreateInvoiceForm}
            onClick={() => {
              setShowCreateInvoiceForm(false);
              navigate(-1);
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white p-8 rounded-tr-lg rounded-br-lg h-screen lg:w-[70%] md:w-[75%] dark:bg-invoicify-12 overflow-y-auto"
            >
              <CreateInvoice />
            </div>
          </FormModal>
        </React.Fragment>
      </div>

      <div>
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
      </div>
    </section>
  );
};

export default InvoiceListWithModal;
