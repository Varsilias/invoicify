import React, { useState } from "react";
import { AddNewIcon, ArrowDownIcon, BackIcon } from "../icons";
import PrimaryButton from "./buttons/PrimaryButton";
import useClickOutside from "../../hooks/useClickOutside";
import { useNavigate } from "react-router-dom";

const TopBar = ({ isMainPage = true }: { isMainPage?: boolean }) => {
  const [showDropdown, setShowDropdown] = useState(true);

  const { ref } = useClickOutside({
    onClickOutside() {
      setShowDropdown(false);
    },
  });

  const navigate = useNavigate();

  return (
    <React.Fragment>
      {isMainPage ? (
        <div className="flex items-center w-full">
          <div className="heading w-[60%]">
            <h1 className="text-invoicify-08 text-base dark:text-white">
              Invoices
            </h1>
            <p className="text-invoicify-06 text-body dark:text-invoicify-05">
              7 Invoices
            </p>
          </div>

          <div
            className="filter relative w-[20%] mr-5 cursor-pointer"
            onClick={() => setShowDropdown(!showDropdown)}
            ref={ref}
          >
            <div className="flex items-center">
              <span className="mr-3 text-sm-variant dark:text-white">
                Filter
              </span>
              <ArrowDownIcon />
            </div>

            {showDropdown && (
              <div
                className="absolute p-6 w-[150px] top-10 bg-white dark:bg-invoicify-04 rounded-lg"
                onClick={(e) => e.stopPropagation()}
              >
                <ul>
                  {["Draft", "Pending", "Paid"].map((status) => (
                    <li key={status}>
                      <input
                        type="checkbox"
                        className="mr-[13px] bg-invoicify-01 hover:border-invoicify-01 cursor-pointer"
                        name={status}
                        id={status}
                      />
                      <span className="text-sm-variant dark:text-white">
                        {status}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="">
            <PrimaryButton className="bg-invoicify-01 py-[6px] pl-2 pr-3 flex items-center">
              <AddNewIcon />
              <span className="ml-2 text-white">New</span>
            </PrimaryButton>
          </div>
        </div>
      ) : (
        <div
          className="flex items-center w-full cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <div className="mr-6">
            <BackIcon />
          </div>

          <div>
            <h1 className="text-sm-variant dark:text-white">Go back</h1>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default TopBar;
