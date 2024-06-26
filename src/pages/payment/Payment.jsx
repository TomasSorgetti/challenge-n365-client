import { useEffect, useState } from "react";
import Navigation from "../../components/navigation/Navigation";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { URL_BASE } from "../../utils/constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import deleteIcon from "../../assets/delete-icon.png";

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

  //*********** useEffect for search payment data ************/
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
  }, []);

  //*********** useEffect for set the form when get payment Data ************/
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

  //*********** Alerts ************/
  const notifyOk = () => toast.success("You have create a new payment");
  const notifyError = () => toast.error("Error creating new payment");
  const notifyWarn = () => toast.warn("Complete all fields");
  const notifyDelete = () => toast.success("You have delete payment");
  const notifyErrorDelete = () => toast.error("Error at delete payment");

  //*********** Update Payment Function ************/
  const handleUpdate = async (event) => {
    event.preventDefault();
    if (
      !form.amount ||
      !form.paymentType ||
      !form.addressee ||
      !form.paymentDate
    )
      notifyWarn();
    if (form.amount && form.paymentType && form.addressee && form.paymentDate) {
      try {
        await axios
          .put(URL, form, {
            headers: {
              authorization: `${token}`,
            },
          })
          .then((response) => {
            if (response) {
              notifyOk();
            }
          });
      } catch (error) {
        notifyError();
        console.log("Error updating payment", error);
      }
    }
  };

  //*********** Delete Payment Function ************/
  const handleDelete = async () => {
    Swal.fire({
      icon: "error",
      text: "Are you sure to delete this payment?",
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
      showCancelButton: true,
      showCloseButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios
            .delete(URL, {
              headers: {
                authorization: `${token}`,
              },
            })
            .then((response) => {
              if (response) {
                notifyDelete();
                setTimeout(() => {
                  navigate("/home");
                }, 2000);
              }
            });
        } catch (error) {
          notifyErrorDelete();
          console.log("Error to delete payment", error);
        }
      }
    });
  };

  return (
    <div className="flex flex-col h-screen">
      <Navigation />
      <main className="flex-1 flex flex-col gap-32 items-center justify-center">
        <ToastContainer position="bottom-left" autoClose={2000} />
        <Link
          to={"/home"}
          className="absolute top-32 left-10 font-bold text-2xl"
        >{`< Home`}</Link>
        <form
          onSubmit={handleUpdate}
          className="bg-primary w-[400px] h-[500px] p-10 rounded-lg flex flex-col items-center justify-between px-10"
        >
          <h1 className="text-white font-bold text-2xl">Update Payment</h1>
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
          <button className="bg-secondary border-[1px] border-solid border-secondary text-white px-10 py-2 rounded-md font-semibold hover:bg-primary hover:border-white focus:font-bold">
            Update
          </button>
        </form>
        <div className="w-full flex justify-center">
          <button
            onClick={handleDelete}
            className=" underline text-red-500 flex items-center gap-1"
          >
            <img className="w-3 mt-1" src={deleteIcon} alt="delete payment" />
            trash
          </button>
        </div>
      </main>
    </div>
  );
};

export default Payment;
