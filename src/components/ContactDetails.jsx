import React from "react";
import { Button, Modal } from "react-bootstrap";

export default function ContactDetails({
  showModalC,
  handleCloseModalC,
  contactId,
}) {
  console.log(contactId);
  return (
    <div>
      {" "}
      <Modal show={showModalC} onHide={handleCloseModalC}>
        <Modal.Header closeButton>
          <Modal.Title>Contact Details</Modal.Title>
        </Modal.Header>
        <div
          style={{
            border: "1px solid black",
            margin : '15px',
            padding: "25px",
            borderRadius: "5px",
            backgroundColor : '#3498DB'
          }}
        >
          <h4>Phone : {contactId?.phone}</h4>
          <h4>Country : {contactId?.country.name}</h4>
        </div>
      </Modal>
    </div>
  );
}
