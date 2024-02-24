export default function Button({ children, buttonType, ...props }) {
  let classes;

  if (buttonType === "text") {
    classes = "text-button";
  } else if (buttonType === "button") {
    classes = "button";
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
