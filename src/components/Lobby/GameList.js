import React from "react";
// import { ActionCable } from "react-actioncable-provider";
// import { API_ROOT } from "../../constants";

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

    render = () => {
        return (
            <div>
                <Card.Group centered>{this.mapGames()}</Card.Group>
            </div>
        );
    };
}
