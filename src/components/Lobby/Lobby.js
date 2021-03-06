import React, { useState, useEffect } from "react";
import { ActionCableConsumer } from "react-actioncable-provider";
import { Grid } from "semantic-ui-react";

import { API_ROOT } from "../../constants";

import NewGameForm from "./NewGameForm";
import GameList from "./GameList";
import InGameChat from "../GameView/InGameChat";

const Lobby = () => {
    const [lobbyStatus, setLobbyStatus] = useState({
        games: [],
        connections: 1,
    });

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
    const handleGamesConnected = () => {
        console.log("Lobby Connected");
    };

    return (
        <div className="lobby">
            <ActionCableConsumer
                channel={{ channel: "GamesChannel" }}
                onReceived={handleReceivedGame}
                onConnected={handleGamesConnected}
            />
            <Grid padded centered>
                <Grid.Column computer={5} tablet={7} mobile={16}>
                    <NewGameForm />
                </Grid.Column>
                <Grid.Column computer={5} tablet={7} mobile={16}>
                    <GameList lobbyStatus={lobbyStatus} />
                </Grid.Column>
                <Grid.Column computer={6} tablet={14} mobile={16}>
                    {/* <LobbyChat name={name} /> */}
                    <InGameChat gameID={1} />
                </Grid.Column>
            </Grid>
        </div>
    );
};

export default Lobby;
