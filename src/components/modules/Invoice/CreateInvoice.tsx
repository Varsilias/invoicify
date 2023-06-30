import TopBar from "../../general/TopBar";
import CreateInvoiceForm from "../../general/forms/CreateInvoiceForm";

const CreateInvoice = () => {
  return (
    <section>
      <div className="my-8">
        <TopBar isMainPage={false} />
      </div>

      <div className="create_form">
        <h1 className="text-base-variant dark:text-white mb-[22px]">
          <span>New Invoice</span>
        </h1>
        <div className="pb-10">
          <CreateInvoiceForm />
        </div>
      </div>
    </section>
  );
};

export default CreateInvoice;
