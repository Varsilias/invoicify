import TopBar from "../../general/TopBar";
import InvoiceList from "./InvoiceList";
// import NoInvoice from "./NoInvoice";

const Home = () => {
  return (
    <section>
      <div className="my-8">
        <TopBar />
      </div>
      <div>
        <InvoiceList />
      </div>
    </section>
  );
};

export default Home;
