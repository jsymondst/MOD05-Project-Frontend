import React from "react";
import { ActionCable } from "react-actioncable-provider";
import { Grid } from "semantic-ui-react";

import { API_ROOT } from "../constants";

import NewGameForm from "./NewGameForm";
import GameListing from "./GameListing";
import GameList from "./GameList";
import GameView from "./GameView";

// import MessagesArea from "./MessagesArea";
// import Cable from "./Cable";

export default class Lobby extends React.Component {
    state = {
        games: [],
        lobby_status: {
            games: [],
            connections: 1,
        },
    };

    fetchGameList = () => {
        fetch(`${API_ROOT}/games`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.lobby_status) {
                    this.setState({
                        // games: data.games,
                        lobby_status: data.lobby_status,
                    });
                }
            });
    };

    componentDidMount = () => {
        this.fetchGameList();
    };

    mapGames = () => {
        const { games } = this.state;
        return (
            <ul>
                {games.map((game) => (
                    <GameListing game={game} key={game.id} />
                ))}
            </ul>
        );
    };

    handleReceivedGame = (response) => {
        console.log(response);
        // const { games } = this.state;
        if (response.lobby_status) {
            this.setState({
                games: response.lobby_status.games,
                lobby_status: response.lobby_status,
            });
        }
    };

    joinGame = (gameID) => {
        this.setState({
            activeGameID: gameID,
        });
    };

    render = () => {
        const { activeGameID, lobby_status } = this.state;

        const gameListMethods = {
            joinGame: this.joinGame,
        };

        return (
            <div className="game-list">
                <ActionCable
                    channel={{ channel: "GamesChannel" }}
                    onReceived={this.handleReceivedGame}
                />
                <Grid>
                    <Grid.Column width={5}>
                        <NewGameForm />
                    </Grid.Column>
                    <Grid.Column width={6}>
                        {/* {this.mapGames()} */}
                        <GameList
                            lobby_status={lobby_status}
                            gameListMethods={gameListMethods}
                        />
                    </Grid.Column>
                    <Grid.Column width={5}>
                        {activeGameID ? (
                            <GameView activeGameID={activeGameID} />
                        ) : null}
                    </Grid.Column>
                </Grid>
            </div>
        );
    };
}
