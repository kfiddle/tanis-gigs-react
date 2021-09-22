import { useState, useRef, useContext } from "react";

import PushBasic from "../helperFunctions/pushFunctions/PushBasic";
import Modal from "../UI/modal/Modal";
import InputText from "../input/InputText";
import InstrumentsDropDown from "../instruments/InstrumentsDropDown";
import InputDate from "../input/InputDate";

import InstrumentsList from "../../store/instruments-list";

import InstrumentToListHelper from "../helperFunctions/InstrumentToListHelper";

import MoneyFunctions from "../helperFunctions/MoneyFunctions";

import classes from "./GigEntry.module.css";

const GigEntry = (props) => {
  const [ensembleDropdownClicked, setEnsembleDropdownClicked] = useState(false);
  const [clickedInstrumentList, setClickedInstrumentList] = useState([]);

  let id = "";
  let date = "";

  const dateRef = useRef();

  if (props.gig) {
    id = props.gig.id;
    date = props.gig.date;
  }

  const submitGig = async (event) => {
    event.preventDefault();
    console.log(clickedInstrumentList)

    // const gigToSendUp = {
    //   date: dateRef.current.value,
    // };

    // let response = await PushBasic(gigToSendUp, "add-gig");
    // if (response.ok) {
    //   props.closeModal();
    // }
  };

  const ensembleClickHandler = () => {
    setEnsembleDropdownClicked(true);
  };

  const instrumentToList = (instrument) => {
    InstrumentToListHelper(instrument, clickedInstrumentList, setClickedInstrumentList);
  }

  return (
    <InstrumentsList.Provider
      value={{
        clickedInstrumentList: clickedInstrumentList,
        instrumentToList
      }}
    >
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
              <InstrumentsDropDown  />
            )}

{/* list={clickedInstrumentList} */}

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
    </InstrumentsList.Provider>
  );
};

export default GigEntry;
