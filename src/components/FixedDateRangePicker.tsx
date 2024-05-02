import React, { useState, useEffect } from 'react';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import moment from 'moment';
import { Input } from '@attrybtech/attryb-ui';

interface FixedDateRangePickerProps {
  onDateRangeChange: (dateRange: string) => void;
  defaultStartDate?: Date;
  defaultEndDate?: Date;
}

const FixedDateRangePicker: React.FC<FixedDateRangePickerProps> = ({
  onDateRangeChange,
  defaultStartDate,
  defaultEndDate,
}) => {
  const [startDate, setStartDate] = useState<Date | undefined>(defaultStartDate);
  const [endDate, setEndDate] = useState<Date | undefined>(defaultEndDate);

  useEffect(() => {
    if (defaultStartDate && defaultEndDate) {
      setStartDate(defaultStartDate);
      setEndDate(defaultEndDate);
    }
  }, [defaultStartDate, defaultEndDate]);

  const handleRangeChange = (ranges: any) => {
    const { startDate, endDate } = ranges.selection;
    const formattedStartDate = moment(startDate).format('MMMM DD, YYYY');
    const formattedEndDate = moment(endDate).format('MMMM DD, YYYY');
    const dateRange = `${formattedStartDate} - ${formattedEndDate}`;
    setStartDate(startDate);
    setEndDate(endDate);
    onDateRangeChange(dateRange);
  };

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>): void {
    // Handle input change if needed
    console.log(e);
  }

  return (
    <div className="date-range-container">
      <div className="selected-range">
        <Input
          variant="input-with-label"
          inputType="text"
          preFilledValue={startDate ? moment(startDate).format('MMMM DD, YYYY') : ''}
          onChange={handleInputChange}
        />
        <Input
          variant="input-with-label"
          inputType="text"
          preFilledValue={endDate ? moment(endDate).format('MMMM DD, YYYY') : ''}
          onChange={handleInputChange}
        />
      </div>
      <DateRangePicker
        onChange={handleRangeChange}
        months={1}
        direction="horizontal"
        ranges={[{ startDate, endDate, key: 'selection' }]}
      />
    </div>
  );
};

export default FixedDateRangePicker;
