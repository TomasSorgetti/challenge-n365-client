import { Link } from "react-router-dom";

const Cards = ({ data }) => {
  return (
    <div className="min-h-[500px] flex flex-col gap-2">
      {data?.map(({ id, amount, paymentType, addressee, paymentDate }) => (
        <Link
          to={`/payment/${id}`}
          key={id}
          className="flex justify-between px-10 bg-gray-200 h-16 items-center"
        >
          <span className="">{addressee}</span>
          <span className="">{paymentType}</span>
          <span className="">${amount}</span>
          <span className="">{paymentDate}</span>
        </Link>
      ))}
    </div>
  );
};

export default Cards;
