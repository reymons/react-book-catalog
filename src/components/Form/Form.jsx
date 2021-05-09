const Form = ({ children, onSubmit, ...props }) => {
  const onFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(e.target.elements);
  }

  return (
    <form onSubmit={onFormSubmit} { ...props }>
      { children }
    </form>
  )
}

export default Form;