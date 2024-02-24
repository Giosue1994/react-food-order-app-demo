import Button from "./Button";

export default function Error({ title, message, onConfirm }) {
  return (
    <div className="error">
      <h2>{title}</h2>
      <p>{message}</p>
      {onConfirm && (
        <div id="confirmation-actions">
          <Button buttonType={"button"} onClick={onConfirm}>
            Okay
          </Button>
        </div>
      )}
    </div>
  );
}
