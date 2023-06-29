import { useState } from "react";
import TopBar from "../../general/TopBar";
import { useParams } from "react-router-dom";
import data from "../../../../data.json";
import EditInvoiceForm from "../../general/forms/EditInvoiceForm";

const EditInvoice = () => {
  const { id } = useParams();

  const [invoice, _] = useState(() => data.find((item) => item.id === id));

  return (
    <section>
      <div className="my-8">
        <TopBar isMainPage={false} />
      </div>

      <div className="edit_form">
        <h1 className="text-base-variant dark:text-white mb-[22px]">
          <span className="mr-2">Edit</span>
          <span className="text-invoicify-06">#</span>
          <span>{invoice?.id}</span>
        </h1>

        <EditInvoiceForm invoice={invoice!} />
      </div>
    </section>
  );
};

export default EditInvoice;
