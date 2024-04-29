import { useState } from "react";
import Modal from "react-modal";
import LastDateRangePicker from "./components/LastDateRangePicker";
import SinceDateRangePicker from "./components/SinceDateRangePicker";
import FixedDateRangePicker from "./components/FixedDateRangePicker";
import './App.css'

Modal.setAppElement("#root");

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '20px',
    minWidth: '300px',
    borderRadius: '8px',
    boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.2)',
    border: 'none'
  },
};

function App() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Last"); // Initialize with the last option

  const handleOpenModal = () => {
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
    setSelectedOption("Last"); // Reset selected option when closing modal
  };

  const handleApply = () => {
    // Handle apply button click here
    setModalIsOpen(false);
  };

  const handleOptionClick = (option: any) => {
    setSelectedOption(option);
  };

  return (
    <div>
      <h1>Custom Date Range</h1>
      <button onClick={handleOpenModal}>Select Date Range</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
        style={customStyles}
        contentLabel="Date Range Modal"
      >
        <div className="button-container">
          <button onClick={() => handleOptionClick("Fixed")} style={{ cursor: 'pointer' }}>Fixed</button>
          <button onClick={() => handleOptionClick("Since")} style={{ cursor: 'pointer' }}>Since</button>
          <button onClick={() => handleOptionClick("Last")} style={{ cursor: 'pointer' }}>Last</button>
        </div>
        {selectedOption && (
          <>
            {selectedOption === "Fixed" && <FixedDateRangePicker />}
            {selectedOption === "Last" && <LastDateRangePicker />}
            {selectedOption === "Since" && <SinceDateRangePicker />}
          </>
        )}
        <div className="button-group">
          <button onClick={handleCloseModal} className="close-button">Close</button>
          <button onClick={handleApply} className="apply-button">Apply</button>
        </div>
      </Modal>
    </div>
  );
}

export default App;
