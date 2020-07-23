import React from "react";
import { ActionCable } from "react-actioncable-provider";
import { API_ROOT } from "../../constants";
import NewGameForm from "../NewGameForm";
import GameListing from "./GameListing";
import { Card } from "semantic-ui-react";
// import MessagesArea from "./MessagesArea";
// import Cable from "./Cable";

export default class GameList extends React.Component {
    mapGames = () => {
        const { games } = this.props.lobbyStatus;
        return (
            <>
                {games.map((game) => (
                    <GameListing game={game} key={game.id} />
                ))}
            </>
        );
    };

    // handleReceivedGame = (response) => {
    //     console.log(response);
    //     // const { games } = this.state;
    //     if (response.lobby_status) {
    //         this.setState({
    //             games: response.lobby_status.games,
    //         });
    //     }
    // };

    render = () => {
        const { lobbyStatus } = this.props;
        return (
            <div>
                <h2>Connected Players: {lobbyStatus.connections}</h2>

                <Card.Group>{this.mapGames()}</Card.Group>
            </div>
        );
    };
}
