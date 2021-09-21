import React from "react";

import classes from "./Input.module.css";

const InputDate = React.forwardRef((props, ref) => {
  const { label, type, checked, onChange, placeholder, date, style } = props;

  return (
    <div className={classes.control} style={style}>
      <label>{label}</label>
      <input type={'date'} ref={ref} placeholder={date} defaultValue={date}></input>
    </div>
  );
});

export default InputDate;
