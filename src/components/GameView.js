import React from "react";
import { ActionCable } from "react-actioncable-provider";
import { Segment } from "semantic-ui-react";
import NewMessageForm from "./NewMessageForm";

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
                <p>Connected to game #{activeGameID}</p>
                <Segment>
                    <ul>
                        {messages.map((message) => {
                            return <li>{message.text}</li>;
                        })}
                    </ul>
                </Segment>
                <NewMessageForm activeGameID={activeGameID} />
            </div>
        );
    }
}
