import React, { useState } from "react";
import { AddNewIcon, ArrowDownIcon, BackIcon } from "../icons";
import PrimaryButton from "./buttons/PrimaryButton";
import useClickOutside from "../../hooks/useClickOutside";
import { Link, useNavigate } from "react-router-dom";
import useMediaQuery from "../../hooks/useMediaQuery";
import CreateInvoice from "../modules/Invoice/CreateInvoice";
import FormModal from "./modal/FormModal";
import { useFilterContext } from "../../context/FilterContext";

const TopBar = ({
  isMainPage = true,
  invoiceCount = 0,
}: {
  isMainPage?: boolean;
  invoiceCount?: number;
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showCreateInvoiceForm, setShowCreateInvoiceForm] = useState(false);
  const { dispatch, selectedFilterOption } = useFilterContext();

  const { breakpoint } = useMediaQuery();

  const { ref } = useClickOutside({
    onClickOutside() {
      setShowDropdown(false);
    },
  });

  const navigate = useNavigate();

  const handleSetFilter = (filterOption: string) => {
    dispatch({ type: filterOption, payload: {} });
    setShowDropdown(false);
  };

  return (
    <React.Fragment>
      {isMainPage ? (
        <div className="flex items-center w-full">
          <div className="heading grow mr-4">
            <h1 className="text-invoicify-08 text-base dark:text-white mb-2">
              Invoices
            </h1>
            <p className="text-invoicify-06 text-body dark:text-invoicify-05">
              {breakpoint === "xs" || breakpoint === "sm"
                ? `${invoiceCount} Invoices`
                : `There are ${invoiceCount} Invoices`}
            </p>
          </div>

          <div
            className="filter relative mr-5 cursor-pointer"
            onClick={() => setShowDropdown(!showDropdown)}
            ref={ref}
          >
            <div className="flex items-center">
              <span className="mr-3 text-sm-variant dark:text-white">
                {breakpoint === "xs" || breakpoint === "sm"
                  ? `Filter`
                  : `Filter by status`}
              </span>
              <ArrowDownIcon />
            </div>

            {showDropdown && (
              <div
                className="absolute p-6 w-[150px] top-10 bg-white dark:bg-invoicify-04 rounded-lg"
                onClick={(e) => e.stopPropagation()}
              >
                <ul>
                  {["Draft", "Pending", "Paid", "All"].map((status) => (
                    <li key={status}>
                      <label htmlFor={status} className="cursor-pointer">
                        <input
                          type="radio"
                          className="mr-[13px] bg-invoicify-01 hover:border-invoicify-01 cursor-pointer"
                          name="status"
                          id={status}
                          checked={status === selectedFilterOption}
                          onChange={(e) => handleSetFilter(e.target.id)}
                        />
                        <span className="text-sm-variant dark:text-white">
                          {status}
                        </span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div>
            <Link to={`/invoice/new`}>
              <div onClick={() => setShowCreateInvoiceForm(true)}>
                <PrimaryButton className="bg-invoicify-01 py-[6px] pl-2 pr-3 flex items-center">
                  <div className="flex items-center">
                    <AddNewIcon />
                    <span className="ml-2 text-white">
                      {breakpoint === "xs" || breakpoint === "sm"
                        ? `New`
                        : `New Invoice`}
                    </span>
                  </div>
                </PrimaryButton>
              </div>
            </Link>
          </div>
        </div>
      ) : (
        <div
          className="flex items-center w-full cursor-pointer"
          onClick={() => {
            document.body.style.overflow = "";
            navigate(-1);
          }}
        >
          <div className="mr-6">
            <BackIcon />
          </div>

          <div>
            <h1 className="text-sm-variant dark:text-white hover:text-invoicify-07">
              Go back
            </h1>
          </div>
        </div>
      )}

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
  );
};

export default TopBar;
