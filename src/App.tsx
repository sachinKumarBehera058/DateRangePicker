import { useState } from 'react';
import CustomDateRangePicker from './components/CustomDateRangePicker/index';
import moment from 'moment'; 

function App() {

  const currentDate = new Date();
  const sevenDaysAgo = moment().subtract(7, 'days').toDate();
  const [startDate, setStartDate] = useState(moment.utc(sevenDaysAgo).startOf('day').format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'));
  const [endDate, setEndDate] = useState(moment.utc(currentDate).startOf('day').format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'));

  // Function to handle date range change
  const handleDateRangeChange = (dateStr: string) => {
    const dateRangeArray = dateStr.split(" - ");
    let start = moment.utc(dateRangeArray[0]).startOf('day').format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
    let end = moment.utc(dateRangeArray[1]).startOf('day').format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');

    setStartDate(start);
    setEndDate(end);
  };

  return (
    <>
      <CustomDateRangePicker
        defaultStartDate={startDate}
        defaultEndDate={endDate}
        onDateRangeChange={handleDateRangeChange}
      />
    </>
  );
}

export default App;
