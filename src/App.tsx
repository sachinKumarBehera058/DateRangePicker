import { useState } from "react";
import Modal from "react-modal";
import LastDateRangePicker from "./components/LastDateRangePicker";
import SinceDateRangePicker from "./components/SinceDateRangePicker";
import FixedDateRangePicker from "./components/FixedDateRangePicker";
import calenderIcon from "./assets/CalenderIcon.svg";
import './App.css'
import { Button } from "@attrybtech/attryb-ui";

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
  const [selectedOption, setSelectedOption] = useState("Last");
  const [selectedDateRange, setSelectedDateRange] = useState("");

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

  const handleDateRangeChange = (dateRange: string) => {
    setSelectedDateRange(dateRange);
  };

  return (
    <div>
      <Button variant="solid" colorScheme="secondary" onClick={handleOpenModal}>
        <img src={calenderIcon}></img>
        {selectedDateRange || "Select Date Range"}
      </Button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
        style={customStyles}
        contentLabel="Date Range Modal"
      >
        <div className="button-container">
          <Button variant="solid" colorScheme="secondary" onClick={() => handleOptionClick("Fixed")} style={{ cursor: 'pointer' }}>Fixed</Button>
          <Button variant="solid" colorScheme="secondary" onClick={() => handleOptionClick("Since")} style={{ cursor: 'pointer' }}>Since</Button>
          <Button variant="solid" colorScheme="secondary" onClick={() => handleOptionClick("Last")} style={{ cursor: 'pointer' }}>Last</Button>
        </div>
        {selectedOption && (
          <>
            {selectedOption === "Fixed" && <FixedDateRangePicker onDateRangeChange={handleDateRangeChange} />}
            {selectedOption === "Last" && <LastDateRangePicker onDateRangeChange={handleDateRangeChange} />}
            {selectedOption === "Since" && <SinceDateRangePicker onDateRangeChange={handleDateRangeChange} />}
          </>
        )}

        <div className="button-group">
          <Button onClick={handleCloseModal} >Close</Button>
          <Button onClick={handleApply} >Apply</Button>
        </div>
      </Modal>
    </div>
  );
}

export default App;
