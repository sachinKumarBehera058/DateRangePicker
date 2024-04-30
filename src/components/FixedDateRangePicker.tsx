import React, { useState, useEffect } from 'react';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import moment from 'moment';
import { Button, Input } from '@attrybtech/attryb-ui';

const FixedDateRangePicker: React.FC = () => {
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
    const endDate = moment().startOf('day').toDate();
    setState([{ startDate, endDate, key: 'selection' }]);
  }, [daysAgo]);

  const handleRangeChange = (ranges: any) => {
    setState([ranges.selection]);
  };


  function handleInputChange(e: any): void {
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
          <Input
          variant={"input-with-label"}
          inputType={"text"}
          preFilledValue={moment(range.endDate).format('MMMM DD, YYYY')}
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

export default FixedDateRangePicker;
