import React, { useState, useEffect } from 'react';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import moment from 'moment';
import { Input } from '@attrybtech/attryb-ui';

interface DateRangePickerProps {
  onDateRangeChange: (dateRange: string) => void;
}

const SinceDateRangePicker: React.FC<DateRangePickerProps> = ({onDateRangeChange}) => {
  const [daysAgo, setDaysAgo] = useState<string>('7');
  const [state, setState] = useState([
    {
      startDate: moment().subtract(7, 'days').startOf('day').toDate(),
      endDate: moment().startOf('day').toDate(),
      key: 'selection',
    },
  ]);

  useEffect(() => {
    const startDate = moment().subtract(Number(daysAgo), 'days').startOf('day').toDate();
    setState([{ startDate, endDate: moment().startOf('day').toDate(), key: 'selection' }]);
  }, [daysAgo]);

  // const handleRangeChange = (ranges: any) => {
  //   setState([{ ...ranges.selection, endDate: moment().startOf('day').toDate() }]);
  // };

  const handleRangeChange = (ranges: any) => {
    const startDate = ranges.selection.startDate;
    const endDate = moment().startOf('day').toDate();
    const formattedStartDate = moment(startDate).format("MMMM DD, YYYY");
    const formattedEndDate = moment(endDate).format("MMMM DD, YYYY");
    const dateRange = `${formattedStartDate} - ${formattedEndDate}`;
    onDateRangeChange(dateRange); 
    setState([{ ...ranges.selection, endDate: moment().startOf('day').toDate() }]);
  };

  function handleInputChange(e: any): void {
    setDaysAgo(e.target.value);
    throw new Error('Function not implemented.');
  }

  return (
    <div className="date-range-container">
      {state.map((range, index) => (
        <div key={index} className="selected-range">
          <Input
          variant={"input-with-label"}
          inputType={"text"}
          preFilledValue={moment(range.startDate).format('MMMM DD, YYYY')}
          onChange={handleInputChange}
          />
        </div>
      ))}
      <DateRangePicker
        onChange={handleRangeChange}
        months={1}
        ranges={state}
        direction="horizontal" 
      />
    </div>
  );
};

export default SinceDateRangePicker;
