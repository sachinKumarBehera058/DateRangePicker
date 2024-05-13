import { useState } from 'react';
import Modal from 'react-modal';
import LastDateRangePicker from '../LastDateRangePicker';
import SinceDateRangePicker from '../SinceDateRangePicker';
import FixedDateRangePicker from '../FixedDateRangePicker';
import calenderIcon from '../../assets/CalenderIcon.svg';
import { Button } from '@attrybtech/attryb-ui';
import './index.css';
import moment from 'moment';

Modal.setAppElement('#root');

type Props = {
    onDateRangeChange: (str: string) => void;
    defaultStartDate?: string;
    defaultEndDate?: string;
};

const CustomDateRangePicker = ({
    onDateRangeChange,
    defaultStartDate,
    defaultEndDate,
}: Props) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('Last');
    const [selectedDateRange, setSelectedDateRange] = useState('');
    const [startDate, setStartDate] = useState<Date | undefined>(
        defaultStartDate ? new Date(defaultStartDate) : undefined
    );
    const [endDate, setEndDate] = useState<Date | undefined>(
        defaultEndDate ? new Date(defaultEndDate) : undefined
    );

    const handleOpenModal = () => {
        setModalIsOpen(true);
    };

    const handleCloseModal = () => {
        setModalIsOpen(false);
        setSelectedOption('Last');

        if (selectedDateRange) {
            onDateRangeChange(selectedDateRange);
        }
    };

    const handleApply = () => {
        setModalIsOpen(false);
        if (selectedDateRange) {
            onDateRangeChange(selectedDateRange);
        }
    };

    const handleOptionClick = (option: string) => {
        setSelectedOption(option);
    };

    const handleDateRangeChange = (dateRange: string) => {
        const startDateString = dateRange.split(' - ')[0];
        const endDateString = dateRange.split(' - ')[1];
        const newStartDate = startDateString ? new Date(startDateString) : undefined;
        const newEndDate = endDateString ? new Date(endDateString) : undefined;
        setStartDate(newStartDate);
        setEndDate(newEndDate);
        setSelectedDateRange(dateRange);
    };


    const renderSelectedDateRangeText = () => {
        if (selectedOption === 'Last') {
          const startDate = moment(selectedDateRange.split(' - ')[0], 'MMMM DD, YYYY');
          const endDate = moment(selectedDateRange.split(' - ')[1], 'MMMM DD, YYYY');
          const differenceInDays = endDate.diff(startDate, 'days');
          return isNaN(differenceInDays) ? 'Select Date Range' : `Last ${differenceInDays} Days`;
        } else if (selectedOption === 'Since') {
          if (!selectedDateRange) {
            return 'Select Date Range';
          } else {
            return `Since ${selectedDateRange.split(' - ')[0]}`;
          }
        } else {
          return selectedDateRange || 'Select Date Range';
        }
      };      

    return (
        <div className='date-range-modal'>
            <Button variant="solid" colorScheme="secondary" onClick={handleOpenModal}>
                <img src={calenderIcon} alt="calendar" />
                {renderSelectedDateRangeText()}
            </Button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={handleCloseModal}
                contentLabel="Date Range Modal"
                id='modal'
                style={{
                    content: {
                        position: 'relative',
                        top: '60px',
                        left: '10px',
                        padding: '0px',
                        maxWidth: '302px',
                        borderRadius: '12px',
                        boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.2)',
                        border: 'none',
                    },
                }}
            >
                <div className="button-container">
                    <a className={`button-container--toggleOption ${selectedOption === 'Fixed' ? 'active' : ''}`} onClick={() => handleOptionClick('Fixed')}>
                        <div className="container">Fixed</div>
                        {selectedOption === 'Fixed' && <div className="highlighted-bar"></div>}
                    </a>
                    <a className={`button-container--toggleOption ${selectedOption === 'Since' ? 'active' : ''}`} onClick={() => handleOptionClick('Since')}>
                        <div className="container">Since</div>
                        {selectedOption === 'Since' && <div className="highlighted-bar"></div>}
                    </a>
                    <a className={`button-container--toggleOption ${selectedOption === 'Last' ? 'active' : ''}`} onClick={() => handleOptionClick('Last')}>
                        <div className="container">Last</div>
                        {selectedOption === 'Last' && <div className="highlighted-bar"></div>}
                    </a>
                </div>

                {selectedOption && (
                    <>
                        {selectedOption === 'Fixed' && (
                            <FixedDateRangePicker
                                onDateRangeChange={handleDateRangeChange}
                                defaultStartDate={startDate}
                                defaultEndDate={endDate}
                            />
                        )}
                        {selectedOption === 'Last' && (
                            <LastDateRangePicker
                                onDateRangeChange={handleDateRangeChange}
                                defaultStartDate={startDate}
                            />
                        )}
                        {selectedOption === 'Since' && (
                            <SinceDateRangePicker
                                onDateRangeChange={handleDateRangeChange}
                                defaultStartDate={startDate}
                            />
                        )}
                    </>
                )}

                <div className="button-group">
                    <Button variant="solid" colorScheme="secondary" id="cancel-btn" onClick={handleCloseModal}>
                        Cancel
                    </Button>
                    <Button id="apply-btn" onClick={handleApply}>Apply</Button>
                </div>
            </Modal>
        </div>
    );
};

export default CustomDateRangePicker;
