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
    const days = parseInt(e.target.value); 
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
        maxDate={endDate}
      />
    </div>
  );
};

export default LastDateRangePicker;
