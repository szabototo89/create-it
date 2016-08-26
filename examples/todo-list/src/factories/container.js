export default (React) => (props) => {
  return <div {...props}>
    {props.children}  
  </div>;
}
