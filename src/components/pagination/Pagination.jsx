const Pagination = ({ data, setSearch, search }) => {
  let pagination = [];

  for (let i = 0; i < data; i++) {
    pagination.push(i + 1);
  }

  const handlePrev = (event) => {
    event.preventDefault();
    if (search.page > 1) {
      setSearch((prev) => ({ ...prev, page: prev.page - 1 }));
    }
  };

  const handleNext = (event) => {
    event.preventDefault();
    if (search.page < data) {
      setSearch((prev) => ({ ...prev, page: prev.page + 1 }));
    }
  };
  return (
    <div className="flex gap-4 w-full justify-center mt-10">
      <button onClick={handlePrev}>Prev</button>
      {pagination?.map((page) => (
        <button
          onClick={() => {
            setSearch((prevSearch) => ({
              ...prevSearch,
              page: page,
            }));
          }}
          className={`w-8 h-8 rounded-sm text-white ${
            page === search.page ? "bg-secondary" : "bg-primary"
          }`}
          key={page}
        >
          {page}
        </button>
      ))}
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default Pagination;
