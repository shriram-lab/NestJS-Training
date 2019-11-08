import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";

export default class ModalComponent extends Component {
  render() {
    const { ModalHeading, children } = this.props;
    return (
      <div>
        <Modal
          {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              {ModalHeading}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>{children}</Modal.Body>
        </Modal>
      </div>
    );
  }
}

ModalComponent.defaultProps = {
  show: false,
  onHide: () => true,
  animation: true,
  ModalHeading: "Modal Heading"
};
