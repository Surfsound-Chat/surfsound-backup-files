import reactDom from "react-dom";
import { MdOutlineClose } from "../../utils/icons";
import "./modal.scss";
export const Modal = ({ isOpen, onClose, children}) => {
    if (!isOpen) return null;
    return reactDom.createPortal(
        <div className="modal-overlay flex-center">
            <div className="modal-content p-1">
                {children}
                <MdOutlineClose size={30} className="modal-content__close-btn" onClick={onClose} />
            </div>
        </div>, document.getElementById("modal-wrapper")
    )
}