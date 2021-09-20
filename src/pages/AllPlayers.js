import { useState, useEffect } from "react";

import PlayersList from "../components/players/PlayersList";
import GetAList from "../components/helperFunctions/GetAList";

const AllPlayers = (props) => {
  const [listOfPlayers, setListOfPlayers] = useState([]);

  useEffect(() => {
    const getPlayers = async () => {
      const allPlayers = await GetAList("get-all-players");
      setListOfPlayers(allPlayers);
      console.log(allPlayers)
    };

    if (props.modalIsClosed) {
      getPlayers();
    }

    getPlayers();
  }, [props.modalIsClosed]);

  return <PlayersList list={listOfPlayers} />;

 
};

export default AllPlayers;
