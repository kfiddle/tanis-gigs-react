import { useState, useRef } from "react";
import PushBasic from "../helperFunctions/pushFunctions/PushBasic";
import Modal from "../UI/modal/Modal";

import classes from "./GigEntry.module.css";

const GigEntry = (props) => {
  let id = "";
  let date = "";

  const dateRef = useRef();

  if (props.gig) {
    id = props.gig.id;
    date = props.gig.date;
  }

  const submitGig = async (event) => {
    event.preventDefault();

    const gigToSendUp = {
      date: dateRef.current.value,
    };

    let response = await PushBasic(gigToSendUp, "add-gig");
    if (response.ok) {
      props.closeModal();
    }
  };

  return (
    <Modal closeModal={props.closeModal}>
      <div className={classes.outerContainer}>
        <form>
          <div className={classes.control}>
            <label>Performance Title</label>
            <input type="text" />
          </div>

          <div className={`${classes.control} ${classes.dateDiv}`}>
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id={classes.dateInput}
              ref={dateRef}
              defaultValue={date}
            />
          </div>

          <div className={classes.buttonDiv}>
            <button className={classes.button} onClick={submitGig}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default GigEntry;
