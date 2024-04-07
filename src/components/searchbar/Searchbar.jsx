import { Link } from "react-router-dom";
import { URL_BASE } from "../../utils/constants";
import Button from "../button/Button";
import axios from "axios";

const Searchbar = ({ search, setSearch }) => {
  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    setSearch({ ...search, [property]: value });
  };

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
    <div className="h-16 bg-primary flex items-center justify-between px-10 rounded-t-sm">
      <input
        className="h-10 rounded-sm w-80"
        type="text"
        onChange={handleChange}
        name="name"
        value={search.name}
      />
      <div className="flex gap-4">
        <select
          onChange={handleChange}
          name="filter"
          className="border-[1px] border-black rounded-[3px] h-7"
        >
          <option value="all">all</option>
          <option value="amount">amount</option>
          <option value="type">type</option>
          <option value="addressee">addressee</option>
          <option value="date">date</option>
        </select>
        <select
          onChange={handleChange}
          name="order"
          className="border-[1px] border-black rounded-[3px] h-7"
        >
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>
      </div>
      <div className="flex gap-10">
        <button className="text-white" onClick={handleDownload}>
          Export
        </button>
        <Link
          className="bg-secondary border-[1px] border-solid border-secondary text-white px-10 py-2 rounded-md font-semibold hover:bg-primary hover:border-white focus:font-bold"
          to={"/new-payment"}
        >
          Add Payment
        </Link>
      </div>
    </div>
  );
};

export default Searchbar;
