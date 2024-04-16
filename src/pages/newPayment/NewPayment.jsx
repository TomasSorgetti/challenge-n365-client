import { useState } from "react";
import Navigation from "../../components/navigation/Navigation";
import { Link } from "react-router-dom";
import axios from "axios";
import { URL_BASE } from "../../utils/constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClipLoader from "react-spinners/ClipLoader";

const NewPayment = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    amount: "",
    paymentType: "",
    addressee: "",
    paymentDate: "",
  });

  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    setForm({ ...form, [property]: value });
  };

  
  //********** Alerts **********/
  const notifyOk = () => toast.success("You have create a new payment");
  const notifyError = () => toast.error("Error creating new payment");
  const notifyWarn = () => toast.warn("Complete all fields");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !form.amount ||
      !form.paymentType ||
      !form.addressee ||
      !form.paymentDate
    )
      notifyWarn();
    else {
      setIsLoading(true);
      const URL = `${URL_BASE}/payments`;
      const token = localStorage.getItem("token");
      try {
        await axios
          .post(URL, form, {
            headers: {
              authorization: `${token}`,
            },
          })
          .then((response) => {
            if (response) {
              setIsLoading(false);
              notifyOk();
              setForm({
                amount: "",
                paymentType: "",
                addressee: "",
                paymentDate: "",
              });
            }
          });
      } catch (error) {
        setIsLoading(false);
        notifyError();
        console.log("Error to post new payment", error);
      }
    }
  };

  const override = {
    position: "absolute",
    top: "140px",
  };
  return (
    <div className="flex flex-col h-screen">
      <Navigation />
      <main className="flex-1 flex items-center justify-center">
        <ClipLoader
          color={"#0d0b1f"}
          loading={isLoading}
          size={30}
          cssOverride={override}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
        <ToastContainer position="bottom-left" autoClose={2000} />
        <Link
          to={"/home"}
          className="absolute top-32 left-10 font-bold text-2xl"
        >{`< Home`}</Link>
        <form
          onSubmit={handleSubmit}
          onReset={() =>
            setForm({
              amount: "",
              paymentType: null,
              addressee: "",
              paymentDate: "",
            })
          }
          className="bg-primary w-[400px] h-[500px] p-10 rounded-lg flex flex-col items-center justify-between px-10"
        >
          <h1 className="text-white font-bold text-2xl">Add payment</h1>
          <section className="flex flex-col w-full gap-4">
            <div className="flex flex-col">
              <label className="text-white font-semibold">Addressee:</label>
              <input
                type="text"
                name="addressee"
                value={form.addressee}
                onChange={handleChange}
                className="h-10 rounded-sm p-2 text-primary"
                placeholder="something"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-white font-semibold">
                Type of payment:
              </label>
              <select
                className="text-primary h-10 rounded-sm p-2"
                onChange={handleChange}
                name="paymentType"
                key={form.paymentType}
                value={form.paymentType}
                id=""
              >
                <option value=""></option>
                <option value="check">check</option>
                <option value="debit">debit</option>
                <option value="transfer">transfer</option>
                <option value="credit">credit</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-white font-semibold">Amount:</label>
              <div className="flex">
                <div className="h-10 w-10 bg-white flex items-center justify-center rounded-l-sm">
                  $
                </div>
                <input
                  type="number"
                  name="amount"
                  value={form.amount}
                  onChange={handleChange}
                  className="h-10 p-2 w-full text-primary rounded-r-sm"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-white font-semibold">Payment Date:</label>
              <input
                type="date"
                name="paymentDate"
                value={form.paymentDate}
                onChange={handleChange}
                className="h-10 rounded-sm p-2 text-primary"
                placeholder="something"
              />
            </div>
          </section>
          <button className="bg-secondary border-[1px] border-solid border-secondary text-white px-10 py-2 rounded-md font-semibold hover:bg-primary hover:border-white focus:font-bold">
            Add
          </button>
        </form>
      </main>
    </div>
  );
};

export default NewPayment;
