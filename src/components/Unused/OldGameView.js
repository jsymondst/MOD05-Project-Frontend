import React from "react";
import { ActionCable } from "react-actioncable-provider";
import { Segment, Grid } from "semantic-ui-react";
import NewMessageForm from "../GameView/NewMessageForm";
import { Tictactoe } from "../../features/tictactoe/Tictactoe";
import { API_ROOT, HEADERS } from "../../constants";

export default class GameView extends React.Component {
    state = {
        messages: [],
    };

    handleReceivedMessage = (response) => {
        const { messages } = this.state;
        // console.log(response);
        messages.push(response);
        this.setState({
            messages,
        });
    };

    sendTurnAsMessage = (turn) => {
        const { activeGameID } = this.props;
        const text = JSON.stringify(turn);
        fetch(`${API_ROOT}/messages`, {
            method: "POST",
            headers: HEADERS,
            body: JSON.stringify({ message: { text, game_id: activeGameID } }),
        });
    };

    render() {
        const { activeGameID } = this.props;
        const { messages } = this.state;
        return (
            <div>
                <ActionCable
                    channel={{
                        channel: "MessagesChannel",
                        game_id: activeGameID,
                    }}
                    onReceived={this.handleReceivedMessage}
                />
                <Grid>
                    <Grid.Column width={5}>
                        <p>Connected to game #{activeGameID}</p>
                        <Segment>
                            <ul>
                                {messages.map((message) => {
                                    return <li>{message.text}</li>;
                                })}
                            </ul>
                        </Segment>
                        <NewMessageForm activeGameID={activeGameID} />
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <Tictactoe sendTurnAsMessage={this.sendTurnAsMessage} />
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}
