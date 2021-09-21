import { useState, useRef, useEffect } from "react";

import PushBasic from "../helperFunctions/pushFunctions/PushBasic";
import Modal from "../UI/modal/Modal";
import InputText from "../input/InputText";
import AllInstruments from "../instruments/allInstruments/AllInstruments";
import InputDate from "../input/InputDate";

import GetAList from "../helperFunctions/GetAList";
import MoneyFunctions from "../helperFunctions/MoneyFunctions";

import classes from "./GigEntry.module.css";
import InputNumber from "../input/InputNumber";

const GigEntry = (props) => {
  const [ensembleDropdownClicked, setEnsembleDropdownClicked] =
    useState(false);
  const [instrumentsList, setInstrumentsList] = useState([]);
    
  const [clickedInstrumentList, setClickedInstrumentList] = useState([]);
  let id = "";
  let date = "";

  const dateRef = useRef();

  if (props.gig) {
    id = props.gig.id;
    date = props.gig.date;
  }

  useEffect(() => {
    const getInstruments = async () => {
      const allInstruments = await GetAList("get-all-instrument-enums");
      setInstrumentsList(allInstruments);
    };

    getInstruments();
  }, []);
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

  const ensembleClickHandler = () => {
      setEnsembleDropdownClicked(true)
  }

  const clickedInstrument = (instrument) => {
    const tempInstrumentList = clickedInstrumentList;
    tempInstrumentList.push(instrument);
    setClickedInstrumentList(tempInstrumentList);
    console.log(clickedInstrumentList);
  };

  const unClickedInstrument = (instrument) => {
    const tempInstrumentList = clickedInstrumentList.filter(
      (instr) => instr.id !== instrument.id
    );
    setClickedInstrumentList(tempInstrumentList);
  };

  return (
    <Modal closeModal={props.closeModal}>
      <div className={classes.outerContainer}>
        <form>
          <InputText label={"Gig Location"} />
          <InputDate label={"Date"} ref={dateRef} />

          <div className={classes.completeTimeDiv}>
            <div className={`${classes.control} ${classes.startTimeDiv}`}>
              <label>Start Time</label>
              <input className={classes.timeInput} style={{ width: "5%" }} />
              <input className={classes.timeInput} style={{ width: "5%" }} />
            </div>
            <div className={`${classes.control} ${classes.endTimeDiv}`}>
              <label>End Time</label>
              <input className={classes.timeInput} style={{ width: "5%" }} />
              <input className={classes.timeInput} style={{ width: "5%" }} />
            </div>
          </div>

          <div
            className={`${classes.control} ${classes.instrumentDropdownDiv}`}
          >
            <h3 onClick={ensembleClickHandler}>Ensemble</h3>
          </div>

          {ensembleDropdownClicked && (
            <div className={classes.instrumentsListDiv}>
              <AllInstruments
              list={instrumentsList}
              clickedInstrument={clickedInstrument}
              unClickedInstrument={unClickedInstrument}
              />
            </div>
          )}

          <InputText label={"Client"} style={{ width: "80%" }} />
          <InputText label={"Client Contact"} style={{ width: "80%" }} />
          <InputText label={"Notes"} style={{ width: "80%" }} />

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
