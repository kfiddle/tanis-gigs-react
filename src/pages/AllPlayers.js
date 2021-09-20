import { useState, useEffect } from "react";

import PlayersList from "../components/players/PlayersList";
import GetAList from "../components/helperFunctions/GetAList";

const AllPlayers = (props) => {
  const [listOfPlayers, setListOfPlayers] = useState([]);

  useEffect(() => {
    const getPlayers = async () => {
      const allContracts = await GetAList("get-all-players");
      setListOfPlayers(allContracts);
      console.log(PlayersList)
    };

    if (props.modalIsClosed) {
      getPlayers();
    }

    getPlayers();
  }, [props.modalIsClosed]);

  // return <PlayersList list={listOfPlayers} />;

  return <div style={{marginTop: '25rem'}}>HELP</div>

 
};

export default AllPlayers;
