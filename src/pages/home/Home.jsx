import { useEffect, useState } from "react";
import Navigation from "../../components/navigation/Navigation";
import Searchbar from "../../components/searchbar/Searchbar";
import axios from "axios";
import { URL_BASE } from "../../utils/constants";
import { debounce } from "lodash";
import Cards from "../../components/cards/Cards";
import Pagination from "../../components/pagination/Pagination";
import Table from "../../components/table/Table";

const Home = () => {
  const [data, setData] = useState({
    payments: [],
    pages: 1,
  });
  const [search, setSearch] = useState({
    name: "",
    filter: "",
    order: "asc",
    orderBy: "amount",
    page: 1,
  });

  useEffect(() => {
    const getData = async () => {
      const URL = `${URL_BASE}/payments?name=${search.name}&order=${search.order}&orderBy=${search.orderBy}&filter=${search.filter}&page=${search.page}`;
      const token = localStorage.getItem("token");
      await axios(URL, {
        headers: {
          authorization: `${token}`,
        },
      })
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };

    const debouncedGetData = debounce(getData, 100);
    debouncedGetData();
    return () => {
      debouncedGetData.cancel();
    };
  }, [search]);

  return (
    <>
      <Navigation />
      <main className="mx-40">
        <section className="mt-20">
          <Searchbar search={search} setSearch={setSearch} />
        </section>
        <div className="mt-2 flex flex-col gap-2">
          <Table setSearch={setSearch} />
          <Cards data={data.payments} />
          <Pagination data={data.pages} setSearch={setSearch} search={search} />
        </div>
      </main>
    </>
  );
};

export default Home;
