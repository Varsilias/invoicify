import { useState } from "react";
import PrimaryButton from "./buttons/PrimaryButton";
import Modal from "./modal";
import { Link } from "react-router-dom";

const BottomNav = ({ invoice }: { invoice: Record<string, any> }) => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="flex justify-between items-center md:justify-end md:space-x-2">
      <Link to={`/invoice/edit/${invoice.id}`}>
        <div className="edit_button">
          <PrimaryButton className="rounded-3xl hover:bg-invoicify-05 cursor-pointer dark:text-invoicify-05 dark:bg-invoicify-04 bg-[#F9FAFE] px-6 py-4 text-invoicify-07">
            Edit
          </PrimaryButton>
        </div>
      </Link>

      <div className="delete_button" onClick={() => setShowPopup(true)}>
        <PrimaryButton className="rounded-3xl cursor-pointer text-white bg-invoicify-09 px-6 py-4 hover:bg-invoicify-10">
          Delete
        </PrimaryButton>
      </div>

      <div className="mark_paid_button">
        <PrimaryButton className="rounded-3xl cursor-pointer px-6 py-4 text-white bg-invoicify-01">
          Mark as Paid
        </PrimaryButton>
      </div>

      <Modal showModal={showPopup} onClick={() => setShowPopup(false)}>
        <div
          onClick={(e) => e.stopPropagation()}
          className="w-[80%] md:w-[60%] lg:w-[40%] bg-white p-8 rounded-lg dark:bg-invoicify-03"
        >
          <div>
            <h1 className="text-base-variant mb-2 dark:text-white">
              Confirm Deletion
            </h1>
            <p className="text-body-sm text-invoicify-06">
              {`Are you sure you want to delete invoice #${invoice.id}? This action
              cannot be undone.`}
            </p>
            <div className="action_buttons mt-5 flex items-center space-x-2 justify-end">
              <div onClick={() => setShowPopup(false)}>
                <PrimaryButton className="bg-[#F9FAFE] px-6 py-4 hover:bg-invoicify-05 text-invoicify-07 dark:text-white dark:bg-invoicify-04">
                  Cancel
                </PrimaryButton>
              </div>

              <PrimaryButton className="bg-invoicify-09 px-6 py-4 hover:bg-invoicify-10 text-white">
                Delete
              </PrimaryButton>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default BottomNav;
