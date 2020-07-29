import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Segment, Divider, Comment } from "semantic-ui-react";
import { ActionCable, ActionCableConsumer } from "react-actioncable-provider";
import { API_ROOT, HEADERS } from "../../constants";

import {
    selectActiveGameID,
    selectPlayerName,
} from "../../features/activeGame/activeGameSlice";

import NewMessageForm from "./NewMessageForm";

export const InGameChat = (props) => {
    const activeGameID = useSelector(selectActiveGameID);
    const gameID = props.gameID ? props.gameID : activeGameID;
    const name = useSelector(selectPlayerName);

    const [messages, setMessages] = useState([]);

    const handleReceivedMessage = (response) => {
        setMessages([...messages, response]);
    };

    const handleConnected = () => {
        console.log("Chat Connected");
        const text = `${name} joined`;
        fetch(`${API_ROOT}/messages`, {
            method: "POST",
            headers: HEADERS,
            body: JSON.stringify({
                message: {
                    text,
                    game_id: gameID,
                    username: "system",
                    message_type: "connection",
                },
            }),
        });
    };

    // useEffect(() => {}, [messages]);

    const drawMessage = (message) => {
        return (
            <Comment>
                <Comment.Content>
                    <Comment.Author>{message.username}</Comment.Author>
                    <Comment.Metadata>
                        <div>{message.created_at}</div>
                    </Comment.Metadata>
                    <Comment.Text>{message.text}</Comment.Text>
                </Comment.Content>
            </Comment>
        );
    };

    return (
        <div>
            <ActionCableConsumer
                channel={{
                    channel: "MessagesChannel",
                    game_id: gameID,
                }}
                onReceived={handleReceivedMessage}
                onConnected={handleConnected}
            />
            <Segment>
                {/* <ul>
                    {messages.map((message) => {
                        return <li key={message.id}>{message.text}</li>;
                    })}
                </ul> */}
                <Comment.Group>
                    {messages.map((message) => {
                        return drawMessage(message);
                    })}
                </Comment.Group>
                <Divider />
                <NewMessageForm activeGameID={gameID} />
            </Segment>
        </div>
    );
};

export default InGameChat;
