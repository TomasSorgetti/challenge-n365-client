import { useEffect, useState } from "react";
import Navigation from "../../components/navigation/Navigation";
import Searchbar from "../../components/searchbar/Searchbar";
import axios from "axios";
import { URL_BASE } from "../../utils/constants";
import { debounce } from "lodash";
import Cards from "../../components/cards/Cards";
import Table from "../../components/table/Table";
import exportIcon from "../../assets/export-icon.png";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    payments: [],
    pages: 1,
  });
  const [search, setSearch] = useState({
    name: "",
    filter: "",
    order: "asc",
    orderBy: "paymentDate",
    minAmount: "",
    maxAmount: "",
    minDate: "",
    maxDate: "",
    page: 1,
  });

  //*********** UseEffect for get Payments list ***********//
  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const URL = `${URL_BASE}/payments?name=${search.name}&order=${search.order}&orderBy=${search.orderBy}&filter=${search.filter}&page=${search.page}&minAmount=${search.minAmount}&maxAmount=${search.maxAmount}&minDate=${search.minDate}&maxDate=${search.maxDate}`;
      const token = localStorage.getItem("token");
      await axios(URL, {
        headers: {
          authorization: `${token}`,
        },
      })
        .then((response) => {
          if (response) {
            setIsLoading(false);
            setData(response.data.payload);
          }
        })
        .catch((error) => {
          setIsLoading(false);
          console.error("Error fetching data:", error);
        });
    };

    //? Debounce for delay the search, so do not search for each letter you tip
    const debouncedGetData = debounce(getData, 150);
    debouncedGetData();
    return () => {
      debouncedGetData.cancel();
    };
  }, [search]);

  const handlePageChange = (event, page) => {
    const pageNumber = parseInt(page);
    if (!isNaN(pageNumber)) {
      setSearch({ ...search, page: pageNumber });
    }
  };

  //**********  Download Excel Function  **********//
  const handleDownload = async (event) => {
    event.preventDefault();
    const URL = `${URL_BASE}/excel?name=${search.name}&order=${search.order}&orderBy=${search.orderBy}&filter=${search.filter}&minAmount=${search.minAmount}&maxAmount=${search.maxAmount}&minDate=${search.minDate}&maxDate=${search.maxDate}`;

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

  const override = {
    position: "absolute",
    top: "90px",
    left: "50%",
  };

  return (
    <>
      <Navigation />
      <main className="lg:mt-10">
        <ClipLoader
          color={"#0d0b1f"}
          loading={isLoading}
          size={30}
          cssOverride={override}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
        <article className="flex gap-10 p-4 lg:mx-auto lg:w-11/12 justify-center lg:justify-end ">
          <button
            className="text-primary font-bold flex items-center hover:underline"
            onClick={handleDownload}
          >
            <img className="w-6" src={exportIcon} alt="export icon" />
            <span>Export</span>
          </button>
          <Link
            className="bg-secondary border-[1px] border-solid border-secondary text-white rounded-md font-semibold hover:bg-primary hover:border-white focus:font-bold px-4 py-2 min-w-fit"
            to={"/new-payment"}
          >
            Add Payment
          </Link>
        </article>
        <Searchbar search={search} setSearch={setSearch} />
        <section className="w-11/12 overflow-x-auto mx-auto my-2">
          <section
            className="w-full
        "
          >
            <article>
              <Table setSearch={setSearch} search={search} />
            </article>
            <Cards data={data.payments} />
          </section>
        </section>

        <section
          className={`w-full my-10 flex justify-center ${
            data.pages === 1 && "hidden"
          }`}
        >
          <Stack spacing={2}>
            <Pagination
              count={data.pages}
              page={search.page}
              onChange={handlePageChange}
              variant="outlined"
              shape="rounded"
            />
          </Stack>
        </section>
      </main>
    </>
  );
};

export default Home;
