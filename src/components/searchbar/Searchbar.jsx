import { useState } from "react";

const Searchbar = ({ search, setSearch }) => {
  const [filter, setFilter] = useState({
    minAmount: "",
    maxAmount: "",
    minDate: "",
    maxDate: "",
  });

  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    setSearch({ ...search, [property]: value });
  };

  const handleMinMaxChange = (event) => {
    const { name, value } = event.target;
    setFilter({ ...filter, [name]: value });
  };

  const handleMinMaxClick = (event) => {
    event.preventDefault();
    setSearch({
      ...search,
      minAmount: filter.minAmount,
      maxAmount: filter.maxAmount,
      minDate: filter.minDate,
      maxDate: filter.maxDate,
    });
  };

  return (
    <section className="bg-primary flex flex-col gap-4 items-center justify-between p-6 lg:flex-row lg:w-11/12 lg:mx-auto lg:items-end">
      <article className="mr-2 w-full lg:w-auto">
        <input
          className="h-10 p-2 rounded-sm w-full lg:w-80"
          type="text"
          onChange={handleChange}
          name="name"
          value={search.name}
          placeholder="Addressee..."
        />
      </article>
      <article className="flex flex-col gap-4 w-full text-white justify-start lg:flex-row lg:items-end">
        <div className="flex gap-2 flex-col lg:w-full">
          <label className="">Amount:</label>
          <div className="flex gap-2">
            <input
              className="h-10 w-full text-primary px-2"
              type="number"
              name="minAmount"
              value={filter.minAmount}
              onChange={handleMinMaxChange}
              placeholder="0"
            />
            to
            <input
              className="h-10 w-full text-primary px-2"
              type="number"
              name="maxAmount"
              value={filter.maxAmount}
              onChange={handleMinMaxChange}
              placeholder="300"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 lg:w-full">
          <label>Date:</label>
          <div className="flex gap-2">
            <input
              className="h-10 w-full text-primary"
              type="date"
              name="minDate"
              value={filter.minDate}
              onChange={handleMinMaxChange}
            />
            to
            <input
              className="h-10 w-full text-primary"
              type="date"
              name="maxDate"
              value={filter.maxDate}
              onChange={handleMinMaxChange}
            />
          </div>
        </div>
        <button
          onClick={handleMinMaxClick}
          className="font-bold underline cursor-pointer p-4"
        >
          Apply
        </button>
      </article>
    </section>
  );
};

export default Searchbar;
