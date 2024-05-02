import { useState } from "react";
import Modal from "react-modal";
import LastDateRangePicker from "../LastDateRangePicker";
import SinceDateRangePicker from "../SinceDateRangePicker";
import FixedDateRangePicker from "../FixedDateRangePicker";
import calenderIcon from "../../assets/CalenderIcon.svg";
import './index.css'
import { Button } from "@attrybtech/attryb-ui";
import moment from 'moment';

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
    padding: '0  0 20px 0',
    minWidth: '300px',
    borderRadius: '8px',
    boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.2)',
    border: 'none'
  },
};

const CustomDateRangePicker: React.FC = () => {
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

  const renderSelectedDateRangeText = () => {
    if (selectedOption === "Last") {
      // Calculate the difference between the start and end dates
      const startDate = moment(selectedDateRange.split(" - ")[0], "MMMM DD, YYYY");
      const endDate = moment(selectedDateRange.split(" - ")[1], "MMMM DD, YYYY");
      const differenceInDays = endDate.diff(startDate, 'days');
      return isNaN(differenceInDays) ? "Select Date Range" : `Last ${differenceInDays} Days`;
    } else if (selectedOption === "Since") {
      // Display only the start date
      return `Since ${selectedDateRange.split(" - ")[0]}`;
    } else {
      // For other options, display the full date range
      return selectedDateRange;
    }
  };

  return (
    <div className="Daterange-Picker--container">
      <Button variant="solid" colorScheme="secondary" onClick={handleOpenModal}>
        <img src={calenderIcon}></img>
        {renderSelectedDateRangeText()}
      </Button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
        style={customStyles}
        contentLabel="Date Range Modal"
      >
        <div className="button-container">
          <a className="button-container--toggleOption" onClick={() => handleOptionClick("Fixed")} >
            <div className="container">Fixed</div>
            {selectedOption === "Fixed" && <div className="highlighted-bar"></div>}
          </a>
          <a className="button-container--toggleOption" onClick={() => handleOptionClick("Since")} >
            <div className="container">Since</div>
            {selectedOption === "Since" && <div className="highlighted-bar"></div>}
          </a>
          <a className="button-container--toggleOption" onClick={() => handleOptionClick("Last")} >
            <div className="container">Last</div>
            {selectedOption === "Last" && <div className="highlighted-bar"></div>}
          </a>
        </div>

        {selectedOption && (
          <>
            {selectedOption === "Fixed" && <FixedDateRangePicker onDateRangeChange={handleDateRangeChange} />}
            {selectedOption === "Last" && <LastDateRangePicker onDateRangeChange={handleDateRangeChange} />}
            {selectedOption === "Since" && <SinceDateRangePicker onDateRangeChange={handleDateRangeChange} />}
          </>
        )}

        <div className="button-group">
          <Button variant="solid" colorScheme="secondary" onClick={handleCloseModal} >
            Close
          </Button>
          <Button onClick={handleApply} >
            Apply
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default CustomDateRangePicker;
