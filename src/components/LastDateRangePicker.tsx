import React, { useState, useEffect } from 'react';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import moment from 'moment';
import './LastDateRangePicker.css';
import { Button } from '@attrybtech/attryb-ui';

const LastDateRangePicker: React.FC = () => {
  const [daysAgo, setDaysAgo] = useState<string>('6'); // Initialize with an empty string
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
    const daysDifference = moment(endDate).diff(moment(startDate), 'days')+1;

    // Update the daysAgo state with the difference
    setDaysAgo(daysDifference.toString());
  }, [state]);

  const handleRangeChange = (ranges: any) => {
    // Disable changing end date by setting it to the current date
    ranges.selection.endDate = moment().startOf('day').toDate();
    setState([ranges.selection]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDaysAgo(e.target.value);
    const startDate = moment().subtract(Number(e.target.value), 'days').startOf('day').toDate();
    const endDate = moment().startOf('day').toDate();
    setState([{ startDate, endDate, key: 'selection' }]);
  };

  return (
    <div className="date-range-container">
      <h4>Selected Date Range</h4>
      <div>
        <input type="number" value={daysAgo} onChange={handleInputChange} />
      </div>
      {state.map((range, index) => (
        <div key={index} className="selected-range">
          <Button variant="solid" colorScheme="secondary">{moment(range.startDate).format('MMMM DD, YYYY')} </Button>|
          <Button variant="solid" colorScheme="secondary">{moment(range.endDate).format('MMMM DD, YYYY')}</Button>
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

export default LastDateRangePicker;
