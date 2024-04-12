import { Link } from "react-router-dom";

const Cards = ({ data }) => {
  return (
    <article className="flex flex-col gap-2 overflow-auto">
      {data?.map(
        ({ id, amount, paymentType, addressee, paymentDate }, index) => (
          <div key={id}>
            <Link
              to={`/payment/${id}`}
              className={`flex justify-between px-10 shadow-sm hover:bg-gray-300 h-14 items-center ${
                index % 2 === 0 ? "bg-gray-200" : "bg-gray-100"
              }`}
            >
              <span className="basis-[30%] justify-start">{addressee}</span>
              <span className="basis-[30%] justify-start">{paymentType}</span>
              <span className="basis-[20%] justify-start">${amount}</span>
              <span className="basis-[20%] justify-start">{paymentDate}</span>
            </Link>
          </div>
        )
      )}
    </article>
  );
};

export default Cards;
