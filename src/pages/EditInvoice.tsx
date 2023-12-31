import MainLayout from "../components/layouts/MainLayout";
import EditInvoiceComponent from "../components/modules/Invoice/EditInvoice";
import InvoiceDetailsWithModal from "../components/modules/Invoice/InvoiceDetailsWithModal";
import useMediaQuery from "../hooks/useMediaQuery";

const EditInvoice = () => {
  const { breakpoint } = useMediaQuery();

  return breakpoint === "sm" || breakpoint === "xs" ? (
    <MainLayout isForm={true}>
      <EditInvoiceComponent />
    </MainLayout>
  ) : (
    <MainLayout>
      <InvoiceDetailsWithModal />
    </MainLayout>
  );
};

export default EditInvoice;
