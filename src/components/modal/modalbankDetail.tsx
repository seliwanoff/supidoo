import React, { useEffect, useState } from "react";
import { Modal, Button, Spinner } from "react-bootstrap";
import Select from "react-select";
import axios from "axios";
import { fetchUserDetails } from "../../store/userSlice";
import { useDispatch } from "react-redux";
import { getbank } from "../../request/_request";

// Define types for the bank data
interface Bank {
  BankName: string;
  BankCode: string;
  BankAvailability: string;
  BankStatus: string;
}

const ModalBankProps: React.FC = () => {
  const [show, setShow] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [selectedOption, setSelectedOption] = useState<{
    value: string;
    label: string;
  } | null>(null);
  const [bankOptions, setBankOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const [requestStatus, setRequestStatus] = useState<
    "idle" | "sending" | "processing" | "done" | "error"
  >("idle");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state
  const [errorFetchingAccountName, setErrorFetchingAccountName] =
    useState(false); // Error state
  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const customSelectStyles = {
    control: (base: any) => ({
      ...base,
      backgroundColor: "#333",
      color: "white",
      borderColor: "#555",
      boxShadow: "none",
      "&:hover": {
        borderColor: "#777",
      },
    }),
    menu: (base: any) => ({
      ...base,
      backgroundColor: "#333",
      color: "white",
    }),
    singleValue: (base: any) => ({
      ...base,
      color: "white",
    }),
  };

  useEffect(() => {
    const fetchBankData = async () => {
      try {
        const response = await getbank();
        const banks: Bank[] = response.data.Data.banks;
        const options = banks.map((bank) => ({
          value: bank.BankCode,
          label: bank.BankName,
        }));
        setBankOptions(options);
      } catch (error) {
        console.error("Error fetching bank data:", error);
      }
    };
    fetchBankData();
  }, []);

  useEffect(() => {
    const verifyAccount = async () => {
      if (accountNumber.length === 10 && selectedOption) {
        setLoading(true);
        setErrorFetchingAccountName(false);
        try {
          const response = await axios.get(`/getname`, {
            params: {
              bank: accountNumber,
              code: selectedOption.value,
            },
          });
          setAccountName(response.data.Data.BeneficiaryName);
        } catch (error) {
          console.error("Error verifying account number:", error);
          setErrorFetchingAccountName(true);
        } finally {
          setLoading(false);
        }
      }
    };
    verifyAccount();
  }, [accountNumber, selectedOption]);

  const formatNumber = (value: string) => {
    return value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const removeCommas = (value: string) => {
    return value.replace(/,/g, "");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(formatNumber(e.target.value));
  };

  const handleAccountNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAccountNumber(e.target.value);
  };

  const handleSelectChange = (
    option: { value: string; label: string } | null
  ) => {
    setSelectedOption(option);
  };

  const handleRequest = async () => {
    const rawAmount = removeCommas(inputValue);
    const amount = parseFloat(rawAmount);

    if (!selectedOption || !rawAmount || !accountNumber || !accountName) {
      alert("Please fill all fields");
      return;
    }

    if (isNaN(amount) || amount < 50000) {
      alert("The minimum amount to withdraw is 50,000.");
      return;
    }

    setRequestStatus("sending");
    try {
      setRequestStatus("processing");
      await axios.post("/withrawrequest", {
        accountname: accountName,
        accountnumber: accountNumber,
        bankname: selectedOption.label,
        amount: rawAmount,
      });
      setRequestStatus("done");
      setShowSuccessModal(true);
      dispatch(fetchUserDetails() as any);
    } catch (error) {
      setRequestStatus("error");
      setShowErrorModal(true);
    } finally {
      setInputValue("");
      setAccountNumber("");
      setAccountName("");
      setSelectedOption(null);
      handleClose();
    }
  };

  return (
    <>
      <a className="withdraw_fund" onClick={handleShow}>
        Withdraw Funds
      </a>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header
          closeButton
          style={{ backgroundColor: "#000", color: "white" }}
        >
          <Modal.Title>Withdraw Funds</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#000", color: "white" }}>
          {/* Select Bank Option */}
          <div style={{ marginBottom: "20px" }}>
            <label>Select Bank:</label>
            <Select
              value={selectedOption}
              onChange={handleSelectChange}
              options={bankOptions}
              isSearchable
              placeholder="Search and select a bank"
              styles={customSelectStyles}
            />
          </div>

          {/* Input Field for Account Number */}
          <div style={{ marginBottom: "20px" }}>
            <label>Account Number:</label>
            <input
              type="text"
              className="form-control"
              value={accountNumber}
              onChange={handleAccountNumberChange}
              placeholder="Enter account number"
              style={{
                backgroundColor: "#333",
                color: "white",
                borderColor: "#555",
              }}
            />
          </div>
          {loading && (
            <div style={{ color: "white", marginBottom: "20px" }}>
              <Spinner animation="border" size="sm" /> Fetching account name...
            </div>
          )}

          {/* Error Message */}
          {errorFetchingAccountName && (
            <div style={{ color: "red", marginBottom: "20px" }}>
              Error fetching account name. Please try again.
            </div>
          )}
          {/* Input Field for Account Name (read-only, shown only when not empty) */}
          {accountName && (
            <div style={{ marginBottom: "20px" }}>
              <label>Account Name:</label>
              <input
                type="text"
                className="form-control"
                value={accountName}
                readOnly
                style={{
                  backgroundColor: "#333",
                  color: "white",
                  borderColor: "#555",
                }}
              />
            </div>
          )}

          {/* Input Field for Amount */}
          <div style={{ marginBottom: "20px" }}>
            <label>Amount:</label>
            <input
              type="text"
              className="form-control"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Enter amount"
              style={{
                backgroundColor: "#333",
                color: "white",
                borderColor: "#555",
              }}
            />
          </div>

          {/* Loading Indicator */}
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "#000" }}>
          <Button
            variant="primary"
            onClick={handleRequest}
            disabled={
              requestStatus === "sending" || requestStatus === "processing"
            }
          >
            {requestStatus === "sending" && "Sending..."}
            {requestStatus === "processing" && "Processing..."}
            {requestStatus === "done" && "Request Sent"}
            {requestStatus === "error" && "Error Occurred"}
            {requestStatus === "idle" && "Send Request"}
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Success Modal */}
      <Modal
        show={showSuccessModal}
        onHide={() => setShowSuccessModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>Your request has been successfully sent!</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowSuccessModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Error Modal */}
      <Modal
        show={showErrorModal}
        onHide={() => setShowErrorModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          There was an error processing your request. Please try again.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowErrorModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalBankProps;
