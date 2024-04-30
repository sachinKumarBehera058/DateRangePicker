import React, { useState, useEffect } from 'react';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import moment from 'moment';
import './LastDateRangePicker.css';
import {Input } from '@attrybtech/attryb-ui';

interface DateRangePickerProps {
  onDateRangeChange: (dateRange: string) => void;
}


const LastDateRangePicker: React.FC<DateRangePickerProps> = ({onDateRangeChange}) => {
  const [daysAgo, setDaysAgo] = useState<string>('7'); // Initialize with an empty string
  const [state, setState] = useState([
    {
      startDate: moment().subtract(Number(daysAgo), 'days').startOf('day').toDate(),
      endDate: moment().startOf('day').toDate(), // Initialize with current date
      key: 'selection',
    },
  ]);

  useEffect(() => {
    const startDate = state[0].startDate;
    const endDate = state[0].endDate;

    // Calculate the difference between endDate and startDate
    const daysDifference = moment(endDate).diff(moment(startDate), 'days');

    // Update the daysAgo state with the difference
    setDaysAgo(daysDifference.toString());
    
    // Update the date range in the Apply button
    updateDateRange();
  }, [state]);

  const handleRangeChange = (ranges: any) => {
    const startDate = ranges.selection.startDate;
    const endDate = moment().startOf('day').toDate();
    const formattedStartDate = moment(startDate).format("MMMM DD, YYYY");
    const formattedEndDate = moment(endDate).format("MMMM DD, YYYY");
    const dateRange = `${formattedStartDate} - ${formattedEndDate}`;
    onDateRangeChange(dateRange); 
    setState([{ ...ranges.selection, endDate: moment().startOf('day').toDate() }]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDaysAgo(e.target.value);
    const startDate = moment().subtract(Number(e.target.value), 'days').startOf('day').toDate();
    const endDate = moment().startOf('day').toDate();
    setState([{ startDate, endDate, key: 'selection' }]);
  };

  const updateDateRange = () => {
    const startDate = state[0].startDate;
    const endDate = state[0].endDate;
    const formattedStartDate = moment(startDate).format("MMMM DD, YYYY");
    const formattedEndDate = moment(endDate).format("MMMM DD, YYYY");
    const dateRange = `${formattedStartDate} - ${formattedEndDate}`;
    onDateRangeChange(dateRange);
  };

  return (
    <div className="date-range-container">
      <div className='date-range-days'>
        <Input
          variant={"input-with-label"}
          inputType={"number"}
          preFilledValue={daysAgo}
          onChange={handleInputChange}
        />
        <Input
          variant={"input-with-label"}
          inputType={"text"}
          preFilledValue={"Days"}
        />
      </div>
      <DateRangePicker
        onChange={handleRangeChange}
        months={1}
        ranges={state}
        direction="horizontal"
      />
    </div>
  );
};

export default LastDateRangePicker;
