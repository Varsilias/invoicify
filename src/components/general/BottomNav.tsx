import { useState } from "react";
import PrimaryButton from "./buttons/PrimaryButton";
import Modal from "./modal";
import { Link } from "react-router-dom";
import useUpdateInvoice from "../../hooks/api/invoices/useUpdateInvoice";
import { handleError } from "../../utils";
import { Toast } from "./toast/Toast";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useDeleteInvoice from "../../hooks/api/invoices/useDeleteInvoice";

const BottomNav = ({ invoice }: { invoice: Record<string, any> }) => {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const { isLoading: updatingInvoice, mutate: updateInvoice } =
    useUpdateInvoice({
      onSuccess(data) {
        const res = data?.data;
        console.log("UPDATE_RESULT", res);
        if (!res?.status || res?.status === "error") {
          toast(<Toast type="error">{res?.message}</Toast>);
          return;
        }

        toast(<Toast type="success">{"Invoice marked as paid"}</Toast>);
        navigate("/");
      },
      onError(error) {
        handleError(error, (message) =>
          toast(<Toast type="error">{message}</Toast>),
        );
      },
    });

  const { isLoading: deletingInvoice, mutate: deleteInvoice } =
    useDeleteInvoice({
      onSuccess(data) {
        const res = data?.data;
        console.log("DELETE_RESULT", res);
        if (!res?.status || res?.status === "error") {
          toast(<Toast type="error">{res?.message}</Toast>);
        } else {
          toast(<Toast type="success">{"Invoice deleted succesfully"}</Toast>);
          navigate("/");
        }
      },
      onError(error) {
        handleError(error, (message) =>
          toast(<Toast type="error">{message}</Toast>),
        );
      },
    });

  return (
    <div className="flex justify-between items-center md:justify-end md:space-x-2">
      <Link to={`/invoice/edit/${invoice.publicId}`}>
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

      {invoice.status !== "Paid" ? (
        <div className="mark_paid_button">
          <PrimaryButton
            className="rounded-3xl cursor-pointer px-6 py-4 text-white bg-invoicify-01"
            isLoading={updatingInvoice}
            onClick={() => {
              updateInvoice({ publicId: invoice?.publicId, status: "Paid" });
            }}
          >
            Mark as Paid
          </PrimaryButton>
        </div>
      ) : null}

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
              {`Are you sure you want to delete invoice #${invoice.invoiceId}? This action
              cannot be undone.`}
            </p>
            <div className="action_buttons mt-5 flex items-center space-x-2 justify-end">
              <div onClick={() => setShowPopup(false)}>
                <PrimaryButton className="bg-[#F9FAFE] px-6 py-4 hover:bg-invoicify-05 text-invoicify-07 dark:text-white dark:bg-invoicify-04">
                  Cancel
                </PrimaryButton>
              </div>

              <PrimaryButton
                className="bg-invoicify-09 px-6 py-4 hover:bg-invoicify-10 text-white"
                isLoading={deletingInvoice}
                onClick={() => {
                  deleteInvoice({ publicId: invoice.publicId });
                }}
              >
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
