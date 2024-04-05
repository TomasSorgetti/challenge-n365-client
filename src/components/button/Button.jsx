const Button = ({ label }) => {
  return (
    <button className="bg-secondary border-[1px] border-solid border-secondary text-white px-10 py-2 rounded-md font-semibold hover:bg-primary  hover:border-white focus:font-bold">
      {label}
    </button>
  );
};

export default Button;
