import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function Example(props: any) {
  //const [show, setShow] = useState(false);
  // console.log(props);

  const handleClose = () => props.setshow(false);
  const [token, setToken] = useState("");
  // const handleShow = () => setShow(true);

  return (
    <>
      <Modal show={props.show}>
        <Modal.Header closeButton>
          <Modal.Title>Enter Your Token</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="instruction-text">
            Congratulations on obtaining your tokens! To continue, please enter
            your token in the provided field below. This will ensure you have
            uninterrupted access to all features.
          </div>

          <div className="container-input">
            <input
              type="text"
              className="token-input"
              placeholder="Enter your token here"
              value={token}
              onChange={(e) => {
                setToken(e.target.value);
              }}
            />
            <button
              className="animated-button"
              style={{
                background: "#fa4299",
              }}
              disabled={props?.tokenLoader}
              onClick={() => props?.verifyToken(token)}
            >
              {props?.tokenLoader ? "Please wait, verifying" : "Submit Token"}
            </button>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Example;
