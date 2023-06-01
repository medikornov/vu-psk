import React, { useEffect } from "react";
import { Toast, ToastContainer } from "react-bootstrap";

export const ToastMessage = ({ showToast, message, buttonCb }: { showToast?: boolean, message?: string, buttonCb?: () => void }) => {
    const [show, setShow] = React.useState(false);

    useEffect(() => {
        if (showToast && showToast === true)
            setShow(true);
    }, [showToast])

    return (
        <ToastContainer
            className="p-3"
            position={"bottom-end"}
            style={{ zIndex: 1 }}
        >
            <Toast
                bg={"Light"}
                onClose={() => setShow(false)}
                show={show}
                delay={5000}
            >
                <Toast.Header closeButton={false}>
                    <img
                        src="holder.js/20x20?text=%20"
                        className="rounded me-2"
                        alt=""
                    />
                    <strong className="me-auto">Info</strong>
                </Toast.Header>
                <Toast.Body>{message}
                <button 
                onClick={() => {
                    buttonCb?.();
                    setShow(false);
                }}>
                    Override with current data
                </button>
                </Toast.Body>
            </Toast>
        </ToastContainer>);
};