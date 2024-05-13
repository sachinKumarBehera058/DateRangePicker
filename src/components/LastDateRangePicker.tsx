import React, { useState, useEffect } from 'react';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import moment from 'moment';
import { Input } from '@attrybtech/attryb-ui';

interface LastDateRangePickerProps {
  onDateRangeChange: (dateRange: string) => void;
  defaultStartDate?: Date;
}

const LastDateRangePicker: React.FC<LastDateRangePickerProps> = ({
  onDateRangeChange,
  defaultStartDate,
}) => {
  const [startDate, setStartDate] = useState<Date | undefined>(defaultStartDate);
  const [endDate, setEndDate] = useState<Date | undefined>(new Date()); // Initialize endDate with current date

  useEffect(() => {
    if (defaultStartDate) {
      setStartDate(defaultStartDate);
    }
  }, [defaultStartDate]);

  const handleRangeChange = (ranges: any) => {
    const startDate = ranges.selection.startDate;
    const endDate = new Date(); 
    const formattedStartDate = moment(startDate).format('MMMM DD, YYYY');
    const formattedEndDate = moment(endDate).format('MMMM DD, YYYY');
    const dateRange = `${formattedStartDate} - ${formattedEndDate}`;
    onDateRangeChange(dateRange);
    setStartDate(startDate);
    setEndDate(endDate);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let days = parseInt(e.target.value);
    // Validate input to ensure it's within a reasonable range
    if (isNaN(days) || days < 1 || days > 45000) {
      // If input is invalid, set days to 1 (or any default value) or limit it to the maximum value
      days = Math.min(Math.max(days, 1), 45000);
    }
  
    const newStartDate = moment().subtract(days, 'days').startOf('day').toDate(); 
    setStartDate(newStartDate); 
  
    const formattedStartDate = moment(newStartDate).format('MMMM DD, YYYY');
    const formattedEndDate = moment(endDate).format('MMMM DD, YYYY');
    const dateRange = `${formattedStartDate} - ${formattedEndDate}`;
    onDateRangeChange(dateRange);
  };
  

  const daysDifference = Math.abs(moment(startDate).diff(moment(endDate), 'days'));

  return (
    <div className="date-range-container">
      <div className="date-range-days">
        <Input
          variant="input-with-label"
          inputType="number"
          preFilledValue={daysDifference.toString() === '0' ? "Enter a number" : daysDifference.toString()}
          onChange={handleInputChange}
        />
        <Input variant="input-with-label" inputType="text" preFilledValue="Days" />
      </div>
      <DateRangePicker
        onChange={handleRangeChange}
        months={1}
        direction="horizontal"
        ranges={[{ startDate, endDate, key: 'selection' }]}
        weekdayDisplayFormat={'EEEEEE'}
        maxDate={endDate}
      />
    </div>
  );
};

export default LastDateRangePicker;
