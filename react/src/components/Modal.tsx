import { ReactNode } from "react";

function Modal({ children }: { children: ReactNode }) {
    return (
        <>
            <div id="myModal" className="modal">
                {/* <!-- Modal content --> */}

                <div className="modal-content"> {children}</div>
            </div>
        </>
    );
}

export default Modal;
