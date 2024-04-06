import { useState } from "react";
import Button from "../../components/button/Button";
import Navigation from "../../components/navigation/Navigation";
import { Link } from "react-router-dom";

const NewPayment = () => {
  const [form, setForm] = useState({
    amount: "",
    paymentType: "",
    addressee: "",
    paymentDate: "",
  });

  const handleChange = () => {};
  return (
    <div className="flex flex-col h-screen">
      <Navigation />
      <main className="flex-1 flex items-center justify-center">
        <Link
          to={"/home"}
          className="absolute top-32 left-10 font-bold text-2xl"
        >{`< Home`}</Link>
        <form
          action=""
          className="bg-primary w-[400px] h-[500px] p-10 rounded-lg flex flex-col items-center justify-between px-10"
        >
          <h1 className="text-white">Add new payment</h1>
          <section className="flex flex-col w-full gap-4">
            <div className="flex flex-col">
              <label className="text-white">Amount</label>
              <input
                type="text"
                name="amount"
                value={form.amount}
                onChange={handleChange}
                className="h-10 rounded-sm p-2 text-primary"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-white">Type of payment</label>
              <input
                type="text"
                name="paymentType"
                value={form.paymentType}
                onChange={handleChange}
                className="h-10 rounded-sm p-2 text-primary"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-white">Addressee</label>
              <input
                type="text"
                name="addressee"
                value={form.addressee}
                onChange={handleChange}
                className="h-10 rounded-sm p-2 text-primary"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-white">Date</label>
              <input
                type="text"
                name="paymentDate"
                value={form.paymentDate}
                onChange={handleChange}
                className="h-10 rounded-sm p-2 text-primary"
              />
            </div>
          </section>
          <Button label={"Send"} />
        </form>
      </main>
    </div>
  );
};

export default NewPayment;
