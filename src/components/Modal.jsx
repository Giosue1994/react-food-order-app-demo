import { useRef, useEffect } from "react";
import { createPortal } from "react-dom";

export default function Modal({ title, children, open, onClose }) {
  const dialog = useRef();

  useEffect(() => {
    const modal = dialog.current;
    if (open) {
      modal.showModal();
    }

    return () => modal.close();
  }, [open]);

  return createPortal(
    <dialog className="modal" ref={dialog} onClose={onClose}>
      <h2>{title}</h2>

      {children}
    </dialog>,
    document.getElementById("modal")
  );
}
