import React, { useEffect } from "react";
import LobbyConnectionHolder from "../Lobby/LobbyConnectionHolder";
import GameView from "../GameView/GameView";
import Header from "./Header";

import { useSelector, useDispatch } from "react-redux";

import {
    selectPlayerName,
    setPlayerName,
    selectActiveGameID,
} from "../../features/activeGame/activeGameSlice";

import { randomAnimal } from "../../constants";
const faker = require("faker/locale/en_GB");

const Main = () => {
    const activeGameID = useSelector(selectActiveGameID);

    return (
        <div className="main">
            <Header />
            {activeGameID ? <GameView /> : <LobbyConnectionHolder />}
        </div>
    );
};

export default Main;
