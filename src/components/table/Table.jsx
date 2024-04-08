import arrowDown from "../../assets/arrow-down.png";
import arrowUp from "../../assets/arrow-up.png";

const Table = ({ setSearch, search }) => {
  const handleClick = (orderBy, order) => {
    setSearch((prevSearch) => ({
      ...prevSearch,
      orderBy: orderBy,
      order: order,
    }));
  };
  const handleFilterApply = (filter) => {
    setSearch({ ...search, filter: filter, page: 1 });
  };
  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    setSearch({ ...search, [property]: value });
    handleFilterApply(value);
  };

  return (
    <tr className="flex w-full mb-2 bg-primary text-white justify-between px-10 py-2">
      {/* addressee */}
      <td className="flex gap-10 basis-[30%] justify-start">
        <span>Addressee</span>
        <div className="flex gap-2">
          <button onClick={() => handleClick("addressee", "asc")}>
            <img className="w-3" src={arrowDown} alt="order ascendent" />
          </button>
          <button onClick={() => handleClick("addressee", "desc")}>
            <img className="w-3" src={arrowUp} alt="order descendent" />
          </button>
        </div>
      </td>

      {/* type of payment */}
      <td className="flex gap-4 basis-[30%] justify-start">
        <span>Type of payment</span>
        <select
          className="text-primary"
          onChange={handleChange}
          name="filter"
          id=""
        >
          <option value="">all</option>
          <option value="check">check</option>
          <option value="debit">debit</option>
          <option value="transfer">transfer</option>
          <option value="credit">credit</option>
        </select>
        <div className="flex gap-2">
          <button onClick={() => handleClick("paymentType", "asc")}>
            <img className="w-3" src={arrowDown} alt="order ascendent" />
          </button>
          <button onClick={() => handleClick("paymentType", "desc")}>
            <img className="w-3" src={arrowUp} alt="order descendent" />
          </button>
        </div>
      </td>

      {/* amount */}
      <td className="flex gap-4 basis-[20%] justify-start">
        <span>Amount</span>
        <div className="flex gap-2">
          <button onClick={() => handleClick("amount", "asc")}>
            <img className="w-3" src={arrowDown} alt="order ascendent" />
          </button>
          <button onClick={() => handleClick("amount", "desc")}>
            <img className="w-3" src={arrowUp} alt="order descendent" />
          </button>
        </div>
      </td>

      {/* payment date */}
      <td className="flex gap-2 basis-[20%]  justify-start">
        <span>Payment Date</span>
        <div className="flex gap-2">
          <button onClick={() => handleClick("paymentDate", "asc")}>
            <img className="w-3" src={arrowDown} alt="order ascendent" />
          </button>
          <button onClick={() => handleClick("paymentDate", "desc")}>
            <img className="w-3" src={arrowUp} alt="order descendent" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default Table;
