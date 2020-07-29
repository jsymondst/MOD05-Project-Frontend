import React from "react";
import { ActionCableConsumer } from "react-actioncable-provider";

export default class ConnectionTracker extends React.Component {
    state = {
        connections: 0,
    };

    handleGamesConnected = () => {
        console.log("Header Games channel connected");
    };

    handleReceivedGame = (response) => {
        if (response.lobby_status) {
            this.setState({
                connections: response.lobby_status.connections,
            });
        }
    };

    render = () => {
        return (
            <div style={{ textAlign: "center" }}>
                <ActionCableConsumer
                    channel={{ channel: "GamesChannel" }}
                    onReceived={this.handleReceivedGame}
                    onConnected={this.handleGamesConnected}
                />
                <h3>{`Connected players: ${this.state.connections}`}</h3>
            </div>
        );
    };
}
