import { Link } from "react-router-dom";
import { URL_BASE } from "../../utils/constants";
import axios from "axios";
import exportIcon from "../../assets/export-icon.png";

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
    <section className="h-16 bg-primary flex items-center justify-between px-10 rounded-t-sm">
      <article>
        <div>
          <div>
            <label >min</label>
            <input type="text" />
          </div>
        </div>
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
