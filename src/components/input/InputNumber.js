import React from "react";

import classes from "./Input.module.css";

const InputNumber = React.forwardRef((props, ref) => {
  const { label, type, checked, onChange, placeholder, style } = props;

  return (
    <div className={classes.control} style={style}>
      <label>{label}</label>
      <input type={'number'} ref={ref} placeholder={placeholder}></input>
    </div>
  );
});

export default InputNumber;
