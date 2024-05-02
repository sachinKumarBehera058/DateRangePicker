import React, { useState, useEffect } from 'react';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import moment from 'moment';
import { InputField } from '@attrybtech/attryb-ui';

interface SinceDateRangePickerProps {
  onDateRangeChange: (dateRange: string) => void;
  defaultStartDate?: Date;
}

const SinceDateRangePicker: React.FC<SinceDateRangePickerProps> = ({
  onDateRangeChange,
  defaultStartDate,
}) => {
  const [startDate, setStartDate] = useState<Date | undefined>(defaultStartDate);
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());

  useEffect(() => {
    if (defaultStartDate) {
      setStartDate(defaultStartDate);
    }
  }, [defaultStartDate]);

  const handleRangeChange = (ranges: any) => {
    const startDate = ranges.selection.startDate;
    const endDate = moment().startOf('day').toDate();
    const formattedStartDate = moment(startDate).format('MMMM DD, YYYY');
    const formattedEndDate = moment(endDate).format('MMMM DD, YYYY');
    const dateRange = `${formattedStartDate} - ${formattedEndDate}`;
    onDateRangeChange(dateRange);
    setStartDate(startDate);
    setEndDate(endDate);
  };

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>): void {
    console.log(e);
  }

  return (
    <div className="date-range-container">
      <div className="selected-range">
        <InputField
          variant="input-with-label"
          inputType="text"
          preFilledValue={startDate ? moment(startDate).format('MMMM DD, YYYY') : ''}
          onChange={handleInputChange}
        />
      </div>
      <DateRangePicker
        onChange={handleRangeChange}
        months={1}
        direction="horizontal"
        maxDate={endDate}
        ranges={[{ startDate, endDate, key: 'selection' }]}
      />
    </div>
  );
};

export default SinceDateRangePicker;
