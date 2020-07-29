import React from "react";
import { ActionCableConsumer } from "react-actioncable-provider";
import { Segment, Divider } from "semantic-ui-react";

import { API_ROOT, HEADERS } from "../../constants";

import NewMessageForm from "../GameView/NewMessageForm";

export default class LobbyChat extends React.Component {
    state = {
        messages: [],
    };

    handleReceivedMessage = (response) => {
        let { messages } = this.state;
        messages.push(response);
        this.setState({
            messages,
        });
    };

    handleConnected = () => {
        const { name } = this.props;
        console.log("Lobby Chat Connected");
        const text = `${name} joined`;
        fetch(`${API_ROOT}/messages`, {
            method: "POST",
            headers: HEADERS,
            body: JSON.stringify({ message: { text, game_id: 1 } }),
        });
    };

    render = () => {
        const { messages } = this.state;
        return (
            <div>
                <ActionCableConsumer
                    channel={{
                        channel: "MessagesChannel",
                        game_id: 1,
                    }}
                    onReceived={this.handleReceivedMessage}
                    onConnected={this.handleConnected}
                />
                <Segment>
                    <ul>
                        {messages.map((message) => {
                            return <li key={message.id}>{message.text}</li>;
                        })}
                    </ul>
                    <Divider />
                    <NewMessageForm activeGameID={1} />
                </Segment>
            </div>
        );
    };
}
