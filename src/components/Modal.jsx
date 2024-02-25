import { useRef, forwardRef, useImperativeHandle } from "react";
import { createPortal } from "react-dom";

const Modal = forwardRef(function Modal({ title, children, actions }, ref) {
  const dialog = useRef();

  useImperativeHandle(ref, () => {
    return {
      open: () => {
        dialog.current.showModal();
      },
    };
  });

  return createPortal(
    <dialog className="modal" ref={dialog}>
      <h2>{title}</h2>

      {children}

      <form method="dialog">
        <div className="modal-actions">{actions}</div>
      </form>
    </dialog>,
    document.getElementById("modal")
  );
});

export default Modal;
