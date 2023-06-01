import React from "react";
import { Toast, ToastContainer } from "react-bootstrap";

export const ToastMessage = () => {
    return <></>;
    const [show, setShow] = React.useState(true);
    return (
        <ToastContainer
            className="p-3"
            position={"bottom-end"}
            style={{ zIndex: 1 }}
        >
            <Toast
                bg={"Light"}
                onClose={() => setShow(false)}
                show={true}
                delay={3000}
            >
                <Toast.Header closeButton={false}>
                    <img
                        src="holder.js/20x20?text=%20"
                        className="rounded me-2"
                        alt=""
                    />
                    <strong className="me-auto">Bootstrap</strong>
                    <small>11 mins ago</small>
                </Toast.Header>
                <Toast.Body>Hello, world! This is a toast message.</Toast.Body>
            </Toast>
        </ToastContainer>);
};