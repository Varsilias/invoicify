import TopBar from "../../general/TopBar";
import { useParams } from "react-router-dom";
import data from "../../../../data.json";
import { useState } from "react";
import StatusButton from "../../general/buttons/StatusButton";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import BottomNavWithModal from "../../general/BottomNavWithModal";
dayjs.extend(customParseFormat);

const InvoiceDetailsWithModal = () => {
  const { id } = useParams();

  const [invoice, _] = useState(() =>
    data.find((invoice) => invoice.id === id)
  );

  return (
    <section className="pb-40 md:pb-20">
      <div className="my-8">
        <TopBar isMainPage={false} />
      </div>
      <div className="shadow">
        <div className="status flex items-center bg-white mb-6 dark:bg-invoicify-03 p-6">
          <div className="flex items-center justify-between md:justify-normal md:space-x-5 w-full md:w-[30%]">
            <h3 className="text-body text-[#858BB2]">Status</h3>
            <StatusButton text={invoice?.status!} />
          </div>
          <div className="hidden md:block w-[70%]">
            <BottomNavWithModal invoice={invoice!} />
          </div>
        </div>

        <div className="details bg-white dark:bg-invoicify-03 p-6">
          <div className="md:flex md:justify-between md:mb-5">
            <div className="desc">
              <h1>
                <span className="text-invoicify-07">#</span>
                <span className="text-sm-variant text-invoicify-08 dark:text-white">
                  {invoice?.id}
                </span>
              </h1>
              <p className="text-invoicify-07 text-body">
                {invoice?.description}
              </p>
            </div>

            <div className="w-[88px] whitespace-nowrap flex justify-center items-center flex-wrap my-[30px] md:my-0 text-body text-invoicify-07">
              <div className="space-y-2">
                <p>{invoice?.senderAddress.street}</p>
                <p>{invoice?.senderAddress.city}</p>
                <p>{invoice?.senderAddress.postCode}</p>
                <p>{invoice?.senderAddress.country}</p>
              </div>
            </div>
          </div>

          <div className="md:flex md:space-x-36 ">
            <div className="meta flex justify-between items-start mb-[35px] md:w-[45%]">
              <div className="flex flex-col">
                <div className="date mb-[31px]">
                  <h5 className="text-body text-invoicify-07 mb-[13px] p-1">
                    Invoice Date
                  </h5>
                  <span className="text-invoicify-08 dark:text-white text-[15px] leading-5 font-bold">
                    {dayjs(invoice?.createdAt).format("D MMM YYYY")}
                  </span>
                </div>

                <div className="date">
                  <h5 className="text-body text-invoicify-07 mb-[13px]">
                    Payment Due
                  </h5>
                  <span className="text-invoicify-08 dark:text-white text-[15px] leading-5 font-bold">
                    {dayjs(invoice?.paymentDue).format("D MMM YYYY")}
                  </span>
                </div>
              </div>

              <div>
                <span className="text-body text-invoicify-07 mb-[13px]">
                  Bill To
                </span>
                <h3 className="text-invoicify-08 dark:text-white text-sm mb-2">
                  {invoice?.clientName}
                </h3>
                <div className="w-[88px] whitespace-nowrap flex justify-center items-center flex-wrap text-body text-invoicify-07">
                  <div className="space-y-2">
                    <p>{invoice?.clientAddress.street}</p>
                    <p>{invoice?.clientAddress.city}</p>
                    <p>{invoice?.clientAddress.postCode}</p>
                    <p>{invoice?.clientAddress.country}</p>
                  </div>
                </div>{" "}
              </div>
            </div>

            <div className="delivery mb-[38px]">
              <h5 className="text-body text-invoicify-07 mb-[13px] p-1">
                Sent to
              </h5>
              <span className="text-invoicify-08 dark:text-white text-[15px] leading-5 font-bold">
                {invoice?.clientEmail}
              </span>
            </div>
          </div>

          <div className="items bg-[#F9FAFE] rounded-tr-md rounded-tl-md p-6 dark:bg-invoicify-04">
            {invoice?.items.map((item) => (
              <li
                key={item.name}
                className="flex justify-between mb-6 last:mb-0 items-center"
              >
                <div className="space-y-1">
                  <p className="text-sm-variant dark:text-white">{item.name}</p>
                  <p className="text-sm-variant text-invoicify-07">
                    {item.quantity} x {`£ ${item.price}`}
                  </p>
                </div>
                <div className="text-sm-variant dark:text-white space-x-1">
                  <span>£</span>
                  <span>{item.total}</span>
                </div>
              </li>
            ))}
          </div>

          <div className="total flex justify-between text-white items-center dark:bg-invoicify-08 bg-[#373B53] rounded-br-md rounded-bl-md p-6">
            <p className="text-body">Grand Total</p>
            <p className="space-x-1 text-base-variant">
              <span>£</span>
              <span>{invoice?.total}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="md:hidden bg-white dark:bg-invoicify-03 px-6 py-[22px] fixed bottom-0 h-[91px] left-0 w-full">
        <BottomNavWithModal invoice={invoice!} />
      </div>
    </section>
  );
};

export default InvoiceDetailsWithModal;
