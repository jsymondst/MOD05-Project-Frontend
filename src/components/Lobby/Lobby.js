import React, { useState, useEffect } from "react";
import { ActionCable } from "react-actioncable-provider";
import { Grid } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";

import {
    join,
    leave,
    selectActiveGameID,
} from "../../features/activeGame/activeGameSlice";

import { API_ROOT } from "../../constants";

import NewGameForm from "../NewGameForm";
import GameListing from "./GameListing";
import GameList from "./GameList";
import OldGameView from "../Unused/OldGameView";
import GameView from "../GameView/GameView";

const Lobby = () => {
    const [lobbyStatus, setLobbyStatus] = useState({
        games: [],
        connections: 1,
    });

    const activeGameID = useSelector(selectActiveGameID);

    const fetchLobby = () => {
        fetch(`${API_ROOT}/games`)
            .then((res) => res.json())
            .then((data) => {
                // console.log(data);
                if (data.lobby_status) {
                    setLobbyStatus(data.lobby_status);
                }
            });
    };

    useEffect(fetchLobby, []);

    const handleReceivedGame = (response) => {
        console.log(response);
        // const { games } = this.state;
        if (response.lobby_status) {
            setLobbyStatus(response.lobby_status);
        } else if (response.game) {
            const games = lobbyStatus.games;
            games.push(response.game);
            setLobbyStatus({ ...lobbyStatus, games: games });
        }
    };

    return (
        <div className="lobby">
            <ActionCable
                channel={{ channel: "GamesChannel" }}
                onReceived={handleReceivedGame}
            />
            <Grid>
                <Grid.Column width={5}>
                    <NewGameForm />
                </Grid.Column>
                <Grid.Column width={6}>
                    <GameList lobbyStatus={lobbyStatus} />
                </Grid.Column>
                <Grid.Column width={5}></Grid.Column>
            </Grid>
            {activeGameID ? <GameView /> : null}
        </div>
    );
};

export default Lobby;
