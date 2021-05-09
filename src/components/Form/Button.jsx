const styles = {
  padding: ".5em 1.25em",
  backgroundColor: "rgba(106, 150, 185, .85)",
  border: "1px solid rgb(121, 121, 121)",
  color: "#fff",
  borderRadius: "5px",
  cursor: "pointer",
  outline: "none"
}

const Button = ({ children, ...props }) => {
  return <button {...props} style={styles}>{children}</button>
}

export default Button;