import * as React from "react";
import Modal from "react-bootstrap/Modal";

export const Disclaimer: React.FC = () => {
    const [showModal, setShowModal] = React.useState(false);
    const toggleShow = React.useCallback(
        () => setShowModal(state => !state),
        [],
    );

    return (
        <>
            <p className="appFooter appFooterRight">
                <a
                    href="#"
                    data-toggle="modal"
                    data-target="#disclaimer-modal"
                    onClick={toggleShow}>
                    Disclaimer
                </a>
            </p>

            <Modal show={showModal} onHide={toggleShow}>
                <Modal.Header closeButton>
                    <Modal.Title>Disclaimer</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        This website should in no way be final psak for anyone's
                        davening. It is merely meant as a convenience. Please
                        consult a posek or sefer halacha before making a
                        halachic decision.
                    </p>
                </Modal.Body>
            </Modal>
        </>
    );
};
