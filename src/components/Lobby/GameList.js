import React from "react";
import { ActionCable } from "react-actioncable-provider";
import { API_ROOT } from "../../constants";

import GameListing from "./GameListing";
import { Card, Segment } from "semantic-ui-react";
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
        const { lobbyStatus } = this.props;
        return (
            <div>
                <h2>Connected Players: {lobbyStatus.connections}</h2>

                <Card.Group centered fluid>
                    {this.mapGames()}
                </Card.Group>
            </div>
        );
    };
}
