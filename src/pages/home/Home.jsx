import { useEffect, useState } from "react";
import Navigation from "../../components/navigation/Navigation";
import Searchbar from "../../components/searchbar/Searchbar";
import axios from "axios";
import { URL_BASE } from "../../utils/constants";
import { debounce } from "lodash";

const Home = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState({
    name: "",
    filter: "all",
    order: "asc",
    page: 1,
  });

  useEffect(() => {
    const getData = async () => {
      const URL = `${URL_BASE}/payments`;
      // const URL = `${URL_BASE}/payments?filter=${search.filter}&order=${search.order}&name=${search.name}`;
      const token = localStorage.getItem("token");
      await axios(URL, {
        headers: {
          authorization: `${token}`,
        },
      })
        .then((response) => {
          console.log(response);
          setData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };
    getData();
    // const debouncedGetData = debounce(getData, 300);
    // debouncedGetData();
    // return () => {
    //   debouncedGetData.cancel();
    // };
  }, []);

  return (
    <>
      <Navigation />
      <main className="mx-40">
        <section className="mt-20">
          <Searchbar search={search} setSearch={setSearch} />
        </section>
        <div className="mt-2 flex flex-col gap-2">
          {data?.map(({ id, amount, paymentType, addressee, paymentDate }) => (
            <div
              key={id}
              className="flex justify-between px-6 bg-gray-200 h-16 items-center"
            >
              <span>{amount}</span>
              <span>{paymentType}</span>
              <span>{addressee}</span>
              <span>{paymentDate}</span>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default Home;
