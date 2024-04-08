import { Link } from "react-router-dom";
import { URL_BASE } from "../../utils/constants";
import axios from "axios";
import exportIcon from "../../assets/export-icon.png";
import { useState } from "react";

const Searchbar = ({ search, setSearch }) => {
  const [filter, setFilter] = useState({
    minAmount: "",
    maxAmount: "",
    minDate: "",
    maxDate: "",
  });

  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    setSearch({ ...search, [property]: value });
  };

  const handleMinMaxChange = (event) => {
    const { name, value } = event.target;
    setFilter({ ...filter, [name]: value });
  };

  const handleMinMaxClick = (event) => {
    event.preventDefault();
    setSearch({
      ...search,
      minAmount: filter.minAmount,
      maxAmount: filter.maxAmount,
      minDate: filter.minDate,
      maxDate: filter.maxDate,
    });
  };

  // const handleDownload = async (event) => {
  //   event.preventDefault();
  //   console.log("sended");
  //   `${URL_BASE}/excel?name=${search.name}&order=${search.order}&orderBy=${search.orderBy}&filter=${search.filter}&minAmount=${search.minAmount}&maxAmount=${search.maxAmount}&minDate=${search.minDate}&maxDate=${search.maxDate}`;
  //   const token = localStorage.getItem("token");
  //   try {
  //     const response = await axios.get(URL, {
  //       headers: {
  //         authorization: `${token}`,
  //       },
  //       responseType: "blob",
  //     });
  //     const blob = new Blob([response.data]);
  //     const downloadUrl = window.URL.createObjectURL(blob);
  //     const link = document.createElement("a");
  //     link.href = downloadUrl;
  //     link.setAttribute("download", "payment_list.xlsx");
  //     document.body.appendChild(link);
  //     link.click();
  //     link.remove();
  //   } catch (error) {
  //     console.error("Error to download excel:", error);
  //   }
  // };

  const handleDownload = async (event) => {
    event.preventDefault();
    const URL = `${URL_BASE}/excel`;

    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(URL, {
        headers: {
          authorization: `${token}`,
        },
        responseType: "blob",
      });
      const blob = new Blob([response.data]);
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute("download", "payment_list.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error to download excel:", error);
    }
  };

  return (
    <section className="h-16 bg-primary flex items-center justify-between px-6 rounded-t-sm">
      <article>
        <input
          className="h-10 p-2 w-60"
          type="text"
          onChange={handleChange}
          name="name"
          value={search.name}
          placeholder="something..."
        />
      </article>
      <article className="flex gap-10 text-white justify-start">
        <div className="flex gap-2">
          <label className="">Amount:</label>
          <input
            className="w-16 text-primary"
            type="text"
            name="minAmount"
            value={filter.minAmount}
            onChange={handleMinMaxChange}
          />
          to
          <input
            className="w-16 text-primary"
            type="text"
            name="maxAmount"
            value={filter.maxAmount}
            onChange={handleMinMaxChange}
          />
        </div>
        <div className="flex gap-2">
          <label>Date:</label>
          <input
            className="w-24 text-primary"
            type="date"
            name="minDate"
            value={filter.minDate}
            onChange={handleMinMaxChange}
          />
          to
          <input
            className="w-24 text-primary"
            type="date"
            name="maxDate"
            value={filter.maxDate}
            onChange={handleMinMaxChange}
          />
        </div>
        <button
          onClick={handleMinMaxClick}
          className="font-bold underline cursor-pointer px-4"
        >
          Apply
        </button>
      </article>
      <article className="flex gap-10">
        <button
          className="text-white flex items-center hover:underline"
          onClick={handleDownload}
        >
          <img className="w-6 mt-1" src={exportIcon} alt="export icon" />
          <span>Export</span>
        </button>
        <Link
          className="bg-secondary border-[1px] border-solid border-secondary text-white px-10 py-2 rounded-md font-semibold hover:bg-primary hover:border-white focus:font-bold"
          to={"/new-payment"}
        >
          Add Payment
        </Link>
      </article>
    </section>
  );
};

export default Searchbar;
