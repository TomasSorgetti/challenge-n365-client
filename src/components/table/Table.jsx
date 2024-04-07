import arrowDown from "../../assets/arrow-down.png";
import arrowUp from "../../assets/arrow-up.png";

const Table = ({ setSearch }) => {
  const handleClick = (event, orderBy, order) => {
    event.preventDefault();
    setSearch((prevSearch) => ({
      ...prevSearch,
      orderBy: orderBy,
      order: order,
    }));
  };
  return (
    <ul className="flex w-full bg-primary text-white justify-between px-10 py-2">
      {/* addressee */}
      <li className="flex gap-10">
        <span>Addressee</span>
        <div className="flex gap-2">
          <button onClick={() => handleClick("addressee", "asc")}>
            <img className="w-3" src={arrowDown} alt="order ascendent" />
          </button>
          <button onClick={() => handleClick("addressee", "desc")}>
            <img className="w-3" src={arrowUp} alt="order descendent" />
          </button>
        </div>
      </li>

      {/* type of payment */}
      <li className="flex gap-10">
        <span>Type of payment</span>
        <div className="flex gap-2">
          <button onClick={() => handleClick("paymentType", "asc")}>
            <img className="w-3" src={arrowDown} alt="order ascendent" />
          </button>
          <button onClick={() => handleClick("paymentType", "desc")}>
            <img className="w-3" src={arrowUp} alt="order descendent" />
          </button>
        </div>
      </li>

      {/* amount */}
      <li className="flex gap-10">
        <span>Amount</span>
        <div className="flex gap-2">
          <button onClick={() => handleClick("amount", "asc")}>
            <img className="w-3" src={arrowDown} alt="order ascendent" />
          </button>
          <button onClick={() => handleClick("amount", "desc")}>
            <img className="w-3" src={arrowUp} alt="order descendent" />
          </button>
        </div>
      </li>

      {/* payment date */}
      <li className="flex gap-10">
        <span>Payment Date</span>
        <div className="flex gap-2">
          <button onClick={() => handleClick("paymentDate", "asc")}>
            <img className="w-3" src={arrowDown} alt="order ascendent" />
          </button>
          <button onClick={() => handleClick("paymentDate", "desc")}>
            <img className="w-3" src={arrowUp} alt="order descendent" />
          </button>
        </div>
      </li>
    </ul>
  );
};

export default Table;
