const Button = ({ label, handleClick }) => {
  return (
    <button
      onClick={handleClick}
      className="bg-secondary border-[1px] border-solid border-secondary text-white px-10 py-2 rounded-md font-semibold hover:bg-primary hover:border-white focus:font-bold"
    >
      {label}
    </button>
  );
};

Button.defaultProps = {
  handleClick: () => {},
};

export default Button;
