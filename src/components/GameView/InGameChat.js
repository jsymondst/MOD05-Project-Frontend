import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Segment, Divider } from "semantic-ui-react";
import { ActionCable, ActionCableConsumer } from "react-actioncable-provider";
import { API_ROOT, HEADERS } from "../../constants";

import {
    selectActiveGameID,
    selectPlayerName,
} from "../../features/activeGame/activeGameSlice";

import NewMessageForm from "./NewMessageForm";

export const InGameChat = () => {
    const activeGameID = useSelector(selectActiveGameID);
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
            body: JSON.stringify({ message: { text, game_id: activeGameID } }),
        });
    };

    useEffect(() => {}, [messages]);

    return (
        <div>
            <ActionCableConsumer
                channel={{
                    channel: "MessagesChannel",
                    game_id: activeGameID,
                }}
                onReceived={handleReceivedMessage}
                onConnected={handleConnected}
            />
            <Segment>
                <ul>
                    {messages.map((message) => {
                        return <li key={message.id}>{message.text}</li>;
                    })}
                </ul>
                <Divider />
                <NewMessageForm activeGameID={activeGameID} />
            </Segment>
        </div>
    );
};

export default InGameChat;
