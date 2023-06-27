import React, { useState } from "react";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';

export default function DateTest() {
    const [date, setDate] = useState(new Date());
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [myDate, setMyDate] = useState();

  const current = new Date();
  const date2 = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
  //const[checkDate, setCheckDate] = useState('')

  var checkDate = '';

//   const handleChange = (range) => {
    // const [startDate, endDate] = range;
    // setStartDate(startDate);
    // setEndDate(endDate);
    // setMyDate(startDate);
//   };

const compareDates = (d1, d2) => {
    let date1 = new Date(d1).getTime();
    let date2 = new Date(d2).getTime();
  
    if (date1 < date2) {
      
      <h1>{d1} is less than {d2}</h1>
    } else if (date1 > date2) {
      
      <h1>{d1} is greater than ${d2}</h1>
    } else {
      <h1>Both are equal</h1>
    }
  };

//   compareDates("06/21/2022", "07/28/2021");
// compareDates("01/01/2001", "01/01/2001");
    // compareDates("11/01/2021", "02/01/2022");

    if(date.toLocaleDateString() == '7/6/2023'){
        checkDate = 'True'

    }
    else{
        checkDate = 'false'
    }

  return (
    <div>
        <DatePicker selected={date} onChange={(date) => setDate(date)} />
        

        
    <br />
    <br />
    <br />
    <h1>start date: {date.toLocaleDateString()}</h1>
    <h1>Current date is {date2}</h1>
    <h1>{checkDate}</h1>
    {/* {compareDates(date2,date.toLocaleDateString() )} */}


  </div>
  )
}
