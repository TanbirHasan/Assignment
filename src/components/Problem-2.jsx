import { Button, Form, Modal } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import ContactDetails from "./ContactDetails";
import ClipLoader from "react-spinners/ClipLoader";





const Problem2 = () => {
  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };
  const [showModalA, setShowModalA] = useState(false);
  const [showModalB, setShowModalB] = useState(false);
  const [showModalC, setShowModalC] = useState(false);
  const [loading,setLoading] = useState(false)
  
  let [color, setColor] = useState("#ffffff");
  const [UsContacts, setUsContryContacts] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [contactId, setContactId] = useState();
  
  const [searchInput, setSearchInput] = useState("");
  const [filteredContacts, setFilteredContacts] = useState([]);

  const handleCloseModalA = () => setShowModalA(false);
  const handleShowModalA = () => {
    setShowModalA(true);
    setShowModalB(false);
  };

  const handleCloseModalB = () => setShowModalB(false);
  const handleShowModalB = () => {
    setShowModalB(true);
    setShowModalA(false);
  };

  const handleShowModalC = (data) => {
    setShowModalC(true);
    setShowModalA(false);
    setShowModalB(false);
    setContactId(data);
  };
  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const filterContacts = (input) => {
    if (showModalA) {
      const filtered = filteredContacts.filter(
        (contact) =>
          contact.phone.includes(input) ||
          contact.country.name.toLowerCase().includes(input.toLowerCase())
      );
      console.log(filtered)
      setFilteredContacts(filtered);
    } else {
      const filtered = UsContacts.filter(
        (contact) =>
          contact.phone.includes(input) ||
          contact.country.name.toLowerCase().includes(input.toLowerCase())
      );
      setFilteredContacts(filtered);
    }
  };

  const handleCloseModalC = () => setShowModalC(false);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };
  useEffect(() => {
    fetchContacts();
    filterContacts(searchInput);
  }, [showModalA, isChecked, searchInput]);

  useEffect(() => {
    fetchUsaContacts();
    filterContacts(searchInput);
  }, [showModalB, isChecked, searchInput]);

  const fetchContacts = async () => {
    setLoading(true)
    try {
      if (isChecked) {
        const response = await fetch(
          "https://contact.mediusware.com/api/contacts/"
        );
        const data = await response.json();
        const evenIdContacts = data.results.filter(
          (contact) => contact.id % 2 === 0
        );
        setFilteredContacts(evenIdContacts);
        setLoading(false)
      } else {
        const response = await fetch(
          "https://contact.mediusware.com/api/contacts/"
        );
        const data = await response.json();
        setFilteredContacts(data.results);
        setLoading(false)
      }
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  const fetchUsaContacts = async () => {
    try {
      const response = await fetch(
        "https://contact.mediusware.com/api/country-contacts/United States"
      );
      const data = await response.json();
      setUsContryContacts(data.results);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-2</h4>

        <div className="d-flex justify-content-center gap-3">
          <button
            className="btn btn-lg btn-outline-primary"
            type="button"
            onClick={handleShowModalA}
          >
            All Contacts
          </button>
          <button
            className="btn btn-lg btn-outline-warning"
            type="button"
            onClick={handleShowModalB}
          >
            US Contacts
          </button>
        </div>

        {showModalA ? (
          <Modal show={showModalA} onHide={handleCloseModalA}>
            <Modal.Header closeButton>
              <Modal.Title>All Contacts</Modal.Title>
              <div style={{marginLeft:'10px'}}>
                <input
                  type="text"
                  className="form-control mt-3"
                  placeholder="Search..."
                  value={searchInput}
                  onChange={handleSearchInputChange}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") filterContacts(e.target.value);
                  }}
                />
              </div>
            </Modal.Header>
            <Modal.Body>
              <div className="d-flex gap-3">
                <Button style={{ backgroundColor: "#46139f" }}>
                  All Contacts
                </Button>
                <Button
                  style={{ backgroundColor: "#ff7f50", border: "none" }}
                  onClick={handleShowModalB}
                >
                  Us Contacts
                </Button>
                <Button
                  style={{
                    backgroundColor: "white",
                    borderColor: "#46139f",
                    color: "black",
                  }}
                  onClick={handleCloseModalA}
                >
                  Close
                </Button>
              </div>
              <div className="d-flex flex-column">
                {
                  loading ? <div style={{padding:'40px'}}>  <ClipLoader
                  color={color}
                  loading={loading}
                  cssOverride={override}
                  size={50}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                /></div> : filteredContacts.map((contact) => (
                  <div
                    key={contact?.id}
                    style={{
                      border: "1px solid black",
                      marginTop: "10px",
                      padding: "5px",
                      borderRadius: "5px",
                      cursor: "pointer",
                      backgroundColor: contact?.id % 2 === 0 ? "#E8F5E9" : "#E0F2F1",
                    }}
                    onClick={() => handleShowModalC(contact)}
                  >
                    <p>{contact?.phone}</p>
                    <p>{contact?.country.name}</p>
                  </div>
                ))
                
                }
         
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Form>
                <Form.Check
                  type="checkbox"
                  label="Only Even"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
              </Form>
            </Modal.Footer>
          </Modal>
        ) : (
          <Modal show={showModalB} onHide={handleCloseModalB}>
            <Modal.Header closeButton>
              <Modal.Title>Us Contacts</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="d-flex gap-3">
                <Button
                  style={{ backgroundColor: "#46139f" }}
                  onClick={handleShowModalA}
                >
                  All Contacts
                </Button>
                <Button style={{ backgroundColor: "#ff7f50", border: "none" }}>
                  Us Contacts
                </Button>
                <Button
                  style={{
                    backgroundColor: "white",
                    borderColor: "#46139f",
                    color: "black",
                  }}
                  onClick={handleCloseModalB}
                >
                  Close
                </Button>
              </div>
              <div className="d-flex flex-column">
                {UsContacts.map((contact) => (
                  <div key={contact?.id}>
                    <p>{contact?.phone}</p>
                    <p>{contact?.country.name}</p>
                  </div>
                ))}
              </div>
            </Modal.Body>
            <Modal.Footer></Modal.Footer>
          </Modal>
        )}
      </div>
      {showModalC ? (
        <ContactDetails
          showModalC={showModalC}
          handleCloseModalC={handleCloseModalC}
          contactId={contactId}
        />
      ) : (
        <span></span>
      )}
    </div>
  );
};

export default Problem2;
