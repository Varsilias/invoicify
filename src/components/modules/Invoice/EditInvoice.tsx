import { useState, useEffect } from "react";
import TopBar from "../../general/TopBar";
import { useParams } from "react-router-dom";
import EditInvoiceForm from "../../general/forms/EditInvoiceForm";
import { handleError } from "../../../utils";
import { Toast } from "../../general/toast/Toast";
import { toast } from "react-toastify";
import useGetInvoiceByPublicId from "../../../hooks/api/invoices/useGetInvoiceByPublicId";

const EditInvoice = () => {
  const [invoice, setInvoice] = useState<Record<string, any>>({});
  const { id } = useParams();

  const { mutate: getInvoiceByPublicId } = useGetInvoiceByPublicId({
    onSuccess(data) {
      const res = data?.data;
      setInvoice(res?.data);
    },
    onError(error) {
      handleError(error, (message) => toast(<Toast>{message}</Toast>));
    },
  });

  useEffect(() => {
    getInvoiceByPublicId({ publicId: id });
  }, [id, getInvoiceByPublicId]);

  return (
    <section>
      <div className="my-8">
        <TopBar isMainPage={false} />
      </div>

      <div className="edit_form">
        <h1 className="text-base-variant dark:text-white mb-[22px]">
          <span className="mr-2">Edit</span>
          <span className="text-invoicify-06">#</span>
          <span>{invoice?.invoiceId}</span>
        </h1>

        <div className="pb-10">
          <EditInvoiceForm publicId={id as string} />
        </div>
      </div>
    </section>
  );
};

export default EditInvoice;
