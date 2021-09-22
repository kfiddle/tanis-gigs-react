import { useState, useEffect, useRef } from "react";

import InstrumentsDropDown from "../instruments/InstrumentsDropDown";
import Modal from "../UI/modal/Modal";
import InputText from "../input/InputText";

import InstrumentToListHelper from "../helperFunctions/InstrumentToListHelper";

import InstrumentsList from "../../store/instruments-list";

import PushBasic from "../helperFunctions/pushFunctions/PushBasic";
import GetAList from "../helperFunctions/GetAList";

import classes from "./PlayerEntry.module.css";

const PlayerEntry = (props) => {
  const [selectedType, setSelectedType] = useState([false, false]);
  const [instrumentsList, setInstrumentsList] = useState([]);
  const [instrumentDropdownClicked, setInstrumentDropdownClicked] =
    useState(false);
  const [clickedInstrumentList, setClickedInstrumentList] = useState([]);
  const [deleteButtonClicked, setDeleteButtonClicked] = useState(false);

  let id = "";
  let firstNameArea = "";
  let lastName = "";
  let email = "";
  let homePhone = "";
  let cellPhone = "";
  let addressLine1 = "";
  let addressLine2 = "";
  let city = "";
  let state = "";
  let zip = "";
  let unions = "";

  if (props.player) {
    id = props.player.id;
    firstNameArea = props.player.firstNameArea;
    lastName = props.player.lastName;
    email = props.player.email;
    homePhone = props.player.homePhone;
    cellPhone = props.player.cellPhone;
    addressLine1 = props.player.addressLine1;
    addressLine2 = props.player.addressLine2;
    city = props.player.city;
    state = props.player.state;
    zip = props.player.zip;
    unions = props.player.unions;
  }

  useEffect(() => {
    if (props.player) {
      props.player.type === "CONTRACT"
        ? setSelectedType([true, false])
        : setSelectedType([false, true]);
      console.log(selectedType);
    }
  }, [props.player]);

  const fullNameRef = useRef();
  const homePhoneRef = useRef();
  const cellPhoneRef = useRef();
  const emailRef = useRef();
  const addressLine1Ref = useRef();
  const addressLine2Ref = useRef();
  const cityRef = useRef();
  const stateRef = useRef();
  const zipRef = useRef();

  const instrumentsClickHandler = () => {
    setInstrumentDropdownClicked((previous) => !previous);
  };

  const deleteButtonHandler = async (event) => {
    event.preventDefault();

    setDeleteButtonClicked((previous) => !previous);
    if (deleteButtonClicked) {
      const response = await PushBasic(props.player, "delete-player");
      if (response.ok) {
        props.closeModal();
      }
    }
  };

  const submitPlayer = (event) => {
    event.preventDefault();

    console.log(clickedInstrumentList);

    const names = fullNameRef.current.value.split(" ");
    const tempFirstNameArea = names.slice(0, -1);
    const inputtedFirstNameArea = tempFirstNameArea.join(" ");
    const inputtedLastName = names[names.length - 1];

    const playerToSubmit = {
      id,
      firstNameArea:
        fullNameRef.current.value === ""
          ? firstNameArea
          : inputtedFirstNameArea,
      lastName: fullNameRef.current.value === "" ? lastName : inputtedLastName,

      instrumentEnum:
        clickedInstrumentList.length > 0
          ? clickedInstrumentList[0].toUpperCase().trim(" ")
          : null,

      email: emailRef.current.value === "" ? email : emailRef.current.value,

      homePhone:
        homePhoneRef.current.value === ""
          ? homePhone
          : homePhoneRef.current.value,

      cellPhone:
        cellPhoneRef.current.value === ""
          ? cellPhone
          : cellPhoneRef.current.value,

      addressLine1:
        addressLine1Ref.current.value === ""
          ? addressLine1
          : addressLine1Ref.current.value,

      addressLine2:
        addressLine2Ref.current.value === ""
          ? addressLine2
          : addressLine2Ref.current.value,

      city: cityRef.current.value === "" ? city : cityRef.current.value,
      state: stateRef.current.value === "" ? state : stateRef.current.value,
      zip: zipRef.current.value === "" ? zip : zipRef.current.value,
    };

    const sendPlayerOff = async () => {
      console.log(playerToSubmit.type);
      let response = await PushBasic(playerToSubmit, "add-or-edit-player");
      if (response.ok) {
        props.closeModal();
      }
    };
    setTimeout(sendPlayerOff, 200);
  };

  const instrumentToList = (instrument) => {
    InstrumentToListHelper(
      instrument,
      clickedInstrumentList,
      setClickedInstrumentList
    );
  };

  return (
    <InstrumentsList.Provider
      value={{
        clickedInstrumentList: clickedInstrumentList,
        instrumentToList,
      }}
    >
      <Modal closeModal={props.closeModal}>
        <form className={classes.innerContainer}>
          <div className={`${classes.control} ${classes.nameAndInstrumentDiv}`}>
            <InputText
              label={"Full Name"}
              ref={fullNameRef}
              placeholder={`${firstNameArea} ${lastName}`}
              style={{ width: "50%" }}
            />

            <div
              className={`${classes.control} ${classes.instrumentDropdownDiv}`}
            >
              <h3 onClick={instrumentsClickHandler}>Instrument</h3>
            </div>
          </div>

          {instrumentDropdownClicked && (
            <InstrumentsDropDown />
          )}

          <div className={classes.phoneDiv}>
            <InputText
              label={"Home Phone"}
              ref={homePhoneRef}
              placeholder={homePhone}
            />

            <InputText
              label={"Cell Phone"}
              ref={cellPhoneRef}
              placeholder={cellPhone}
            />
          </div>

          <InputText
            label={"Email"}
            ref={emailRef}
            placeholder={email}
            style={{ width: "90%" }}
          />

          <InputText
            label={"Address Line 1"}
            ref={addressLine1Ref}
            placeholder={addressLine1}
          />

          <InputText
            label={"Address Line 2"}
            ref={addressLine2Ref}
            placeholder={addressLine2}
          />

          <div className={classes.cityStateDiv}>
            <InputText
              label={"City"}
              ref={cityRef}
              placeholder={city}
              style={{ width: "60%", marginRight: "2rem" }}
            />

            <InputText
              label={"State"}
              ref={stateRef}
              placeholder={state}
              style={{ width: "10%", marginRight: "2rem" }}
            />

            <InputText label={"Zip"} ref={zipRef} placeholder={zip} />
          </div>

          <div className={classes.buttonDiv}>
            <button className={classes.button} onClick={submitPlayer}>
              Submit Player
            </button>

            {props.player && (
              <button
                className={classes.deleteButton}
                onClick={deleteButtonHandler}
              >
                {!deleteButtonClicked ? "Remove Player" : "Are You Sure?"}
              </button>
            )}
          </div>
        </form>
      </Modal>
    </InstrumentsList.Provider>
  );
};

export default PlayerEntry;
