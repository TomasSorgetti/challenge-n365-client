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
    const URL = `${URL_BASE}/payments/exportToExcel`;
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
      <Button label={"Download Excel"} handleClick={handleDownload} />
    </div>
  );
};

export default Searchbar;
