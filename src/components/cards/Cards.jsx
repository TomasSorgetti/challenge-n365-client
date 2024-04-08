import { Link } from "react-router-dom";

const Cards = ({ data }) => {
  return (
    <tbody className="flex flex-col gap-2 overflow-auto">
      {data?.map(
        ({ id, amount, paymentType, addressee, paymentDate }, index) => (
          <tr key={id}>
            <Link
              to={`/payment/${id}`}
              className={`flex justify-between px-10 shadow-sm hover:bg-gray-300 h-14 items-center ${
                index % 2 === 0 ? "bg-gray-200" : "bg-gray-100"
              }`}
            >
              <td className="basis-[30%] justify-start">{addressee}</td>
              <td className="basis-[30%] justify-start">{paymentType}</td>
              <td className="basis-[20%] justify-start">${amount}</td>
              <td className="basis-[20%] justify-start">{paymentDate}</td>
            </Link>
          </tr>
        )
      )}
    </tbody>
  );
};

export default Cards;
