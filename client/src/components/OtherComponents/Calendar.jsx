import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import { Message } from "semantic-ui-react";

const Calendar = props => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showWarning, setWarning] = useState(false);
  const [message1, setMessage1] = useState("");
  const [message2, setMessage2] = useState("");

  const compareDates = (startDate, endDate) => {
    var t1 = new Date(startDate).getTime();
    var t2 = new Date(endDate).getTime();
    var today = new Date().getTime();

    if (t2 > today) {
      setMessage1("But this is impossible!");
      setMessage2("You cannot choose a date after today");
      setWarning(true);
      setEndDate("");
      return;
    } else {
      setWarning(false);
    }

    if (t1 > today) {
      setMessage1("But this is impossible!");
      setMessage2("You cannot choose a date after today");
      setStartDate("");
      setWarning(true);
      return;
    } else {
      setWarning(false);
    }

    if (!endDate) {
      setStartDate(startDate);
      return;
    }

    if (!startDate) {
      setEndDate(endDate);
      return;
    }

    if (t2 < t1) {
      setMessage1("These dates are not good!");
      setMessage2("The final date should be after the initial date");
      setWarning(true);
      setEndDate("");
      setStartDate("");
      return;
    } else {
      setWarning(false);
    }

    setEndDate(endDate);
    setStartDate(startDate);

    props.retrieveDates(startDate, endDate);
  };

  const displayWarning = (message1, message2) => {
    return (
      <Message warning>
        <Message.Header>{message1}</Message.Header>
        <p>{message2}</p>
      </Message>
    );
  };

  return (
    <div>
      <div>
        <p style={{ marginBottom: "2px" }}>from</p>
        <DatePicker
          selected={startDate}
          onChange={date => compareDates(date, endDate)}
        />
      </div>
      <div style={{ marginTop: "2%" }}>
        <p style={{ marginBottom: "2px" }}>to</p>
        <DatePicker
          selected={endDate}
          onChange={date => compareDates(startDate, date)}
        />
        {showWarning ? displayWarning(message1, message2) : null}
      </div>
    </div>
  );
};

export default Calendar;
