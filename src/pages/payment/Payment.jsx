import { useEffect, useState } from "react";
import Button from "../../components/button/Button";
import Navigation from "../../components/navigation/Navigation";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { URL_BASE } from "../../utils/constants";

const Payment = () => {
  const navigate = useNavigate();
  const { paymentId } = useParams();
  const [data, setData] = useState({});
  const [form, setForm] = useState({
    amount: "",
    paymentType: "",
    addressee: "",
    paymentDate: "",
  });
  const token = localStorage.getItem("token");
  const URL = `${URL_BASE}/payments/${paymentId}`;

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(URL, {
          headers: {
            authorization: `${token}`,
          },
        });
        setData(response.data);
      } catch (error) {
        console.log("Error fetching payment data", error);
      }
    };

    getData();
  }, [paymentId]);

  useEffect(() => {
    setForm({
      amount: data.amount || "",
      paymentType: data.paymentType || "",
      addressee: data.addressee || "",
      paymentDate: data.paymentDate || "",
    });
  }, [data]);

  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    setForm({ ...form, [property]: value });
  };

  const handleUpdate = async () => {
    if (form.amount && form.paymentType && form.addressee && form.paymentDate) {
      try {
        await axios.put(URL, form, {
          headers: {
            authorization: `${token}`,
          },
        });
      } catch (error) {
        console.log("Error updating payment", error);
      }
    }
  };
  const handleDelete = async () => {
    try {
      await axios
        .delete(URL, {
          headers: {
            authorization: `${token}`,
          },
        })
        .then((response) => {
          if (response) navigate("/home");
        });
    } catch (error) {
      console.log("Error to delete payment", error);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Navigation />
      <main className="flex-1 flex items-center justify-center">
        <Link
          to={"/home"}
          className="absolute top-32 left-10 font-bold text-2xl"
        >{`< Home`}</Link>
        <form
          onSubmit={handleUpdate}
          className="bg-primary w-[400px] h-[500px] p-10 rounded-lg flex flex-col items-center justify-between px-10"
        >
          <h1 className="text-white">Update Payment</h1>
          <section className="flex flex-col w-full gap-4">
            <div className="flex flex-col">
              <label className="text-white font-semibold">Amount:</label>
              <input
                type="number"
                name="amount"
                value={form.amount}
                onChange={handleChange}
                className="h-10 rounded-sm p-2 text-primary"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-white font-semibold">
                Type of payment:
              </label>
              <input
                type="text"
                name="paymentType"
                value={form.paymentType}
                onChange={handleChange}
                className="h-10 rounded-sm p-2 text-primary"
                placeholder="something"
              />
            </div>
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
              <label className="text-white font-semibold">Date:</label>
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
          <Button label={"Update"} />
        </form>
        <button
          onClick={handleDelete}
          className="absolute right-2/4 bottom-10 underline text-red-500"
        >
          trash
        </button>
      </main>
    </div>
  );
};

export default Payment;
