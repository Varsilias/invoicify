import TopBar from "../../general/TopBar";
import InvoiceList from "./InvoiceList";
import { useGetAllInvoices } from "../../../hooks/api/invoices/useGetAllInvoices";
import { handleError } from "../../../utils";
import { toast } from "react-toastify";
import { Toast } from "../../general/toast/Toast";
import { useEffect, useState } from "react";
import { useFilterContext } from "../../../context/FilterContext";

const Home = () => {
  const [data, setData] = useState([]);
  const [dataCount, setDataCount] = useState(0);
  const { state } = useFilterContext();

  const { isLoading, mutate: getAllInvoices } = useGetAllInvoices({
    onSuccess(data) {
      const res = data?.data;
      setData(res?.data);
      setDataCount(res?.data.length);
    },

    onError(error) {
      handleError(error, (message) =>
        toast(<Toast type="error">{message}</Toast>),
      );
    },
  });

  useEffect(() => {
    getAllInvoices({ status: state.type });
  }, [state, getAllInvoices]);

  return (
    <section>
      <div className="my-8">
        <TopBar invoiceCount={dataCount} />
      </div>
      <div>
        <InvoiceList isLoading={isLoading} invoices={data} />
      </div>
    </section>
  );
};

export default Home;
