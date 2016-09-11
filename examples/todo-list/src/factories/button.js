export default (React) => {
  const Button = ({ onClick, children }) => {
    return <a href="#" onClick={onClick}>
      {children}
    </a>;
  };

  return Button;
};
