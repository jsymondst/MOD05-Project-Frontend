import React from "react";
import { ActionCable } from "react-actioncable-provider";
import { API_ROOT } from "../constants";
import NewGameForm from "./NewGameForm";
import GameListing from "./GameListing";
// import MessagesArea from "./MessagesArea";
// import Cable from "./Cable";

export default class GameList extends React.Component {
    state = {
        games: [],
    };

    fetchGameList = () => {
        fetch(`${API_ROOT}/games`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.games) {
                    this.setState({
                        games: data.games,
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
            });
        }
    };

    render = () => {
        const { games } = this.state;
        return (
            <div className="game-list">
                <ActionCable
                    channel={{ channel: "GamesChannel" }}
                    onReceived={this.handleReceivedGame}
                />
                {this.mapGames()}
                <NewGameForm />
            </div>
        );
    };
}
