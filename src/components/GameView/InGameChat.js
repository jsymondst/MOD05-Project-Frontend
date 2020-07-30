import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Segment, Divider, Comment } from "semantic-ui-react";
import { ActionCableConsumer } from "react-actioncable-provider";
import moment from "moment";

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

    const drawMessage = (message, index) => {
        const { username, created_at, text } = message;
        const messageTime = moment(created_at).format("h:mm a");
        return (
            <Comment key={index}>
                <Comment.Content>
                    <div style={{ float: "left" }}>
                        <Comment.Author>{username}</Comment.Author>
                    </div>
                    <div style={{ float: "left" }}>
                        <Comment.Metadata>{messageTime}</Comment.Metadata>
                    </div>
                    <div style={{ clear: "left" }}>
                        <Comment.Text>{text}</Comment.Text>
                    </div>
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
            <Segment textAlign="left">
                {/* <ul>
                    {messages.map((message) => {
                        return <li key={message.id}>{message.text}</li>;
                    })}
                </ul> */}
                <Comment.Group>
                    {messages.map((message, index) => {
                        return drawMessage(message, index);
                    })}
                </Comment.Group>
                <Divider />
                <NewMessageForm activeGameID={gameID} />
            </Segment>
        </div>
    );
};

export default InGameChat;
