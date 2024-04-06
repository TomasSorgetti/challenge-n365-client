import { useEffect, useState } from "react";
import Navigation from "../../components/navigation/Navigation";
import Searchbar from "../../components/searchbar/Searchbar";
import axios from "axios";
import { URL_BASE } from "../../utils/constants";
import { debounce } from "lodash";

const Home = () => {
  const [data, setData] = useState(null);
  const [search, setSearch] = useState({
    name: "",
    filter: "all",
    order: "asc",
    page: 1,
  });

  useEffect(() => {
    // const getData = async () => {
    //   const URL = `${URL_BASE}/payments?filter=${search.filter}&order=${search.order}&name=${search.name}`;
    //   const token = localStorage.getItem("token");
    //   await axios(URL, null, {
    //     headers: {
    //       authorization: `${token}`,
    //     },
    //   }).then((response) => {
    //     if (!response) console.log("error fetching data");
    //     else {
    //       console.log(response);
    //       setData(response.data);
    //     }
    //   });
    // };
    // debounce for delay the fetch and do not make to much requests
    // const debouncedGetData = debounce(getData, 300);
    // debouncedGetData();
    // return () => {
    //   debouncedGetData.cancel();
    // };
  }, [search]);

  return (
    <main className="h-screen">
      <Navigation />
      <section className="mx-40 my-20">
        <Searchbar search={search} setSearch={setSearch} />
      </section>
      {data?.map((item) => (
        <div key={item}>{item}</div>
      ))}
    </main>
  );
};

export default Home;
