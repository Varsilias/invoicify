import MainLayout from "../components/general/MainLayout";
import EditInvoiceComponent from "../components/modules/Invoice/EditInvoice";

const EditInvoice = () => {
  return (
    <MainLayout isForm={true}>
      <EditInvoiceComponent />
    </MainLayout>
  );
};

export default EditInvoice;
