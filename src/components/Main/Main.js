import React from "react";
import LobbyConnectionHolder from "../Lobby/LobbyConnectionHolder";
import GameView from "../GameView/GameView";
import Header from "./Header";

import { useSelector } from "react-redux";

import { selectActiveGameID } from "../../features/activeGame/activeGameSlice";

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
