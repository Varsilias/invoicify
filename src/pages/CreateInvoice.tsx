import CreateInvoiceComponent from "../components/modules/Invoice/CreateInvoice";
import MainLayout from "../components/general/MainLayout";
import useMediaQuery from "../hooks/useMediaQuery";
import InvoiceListWithModal from "../components/modules/Invoice/InvoiceListWithModal";

const CreateInvoice = () => {
  const { breakpoint } = useMediaQuery();

  return breakpoint === "sm" || breakpoint === "xs" ? (
    <MainLayout>
      <CreateInvoiceComponent />
    </MainLayout>
  ) : (
    <MainLayout>
      <InvoiceListWithModal />
    </MainLayout>
  );
};

export default CreateInvoice;
