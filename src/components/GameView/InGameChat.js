import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Segment } from "semantic-ui-react";
import { ActionCable, ActionCableConsumer } from "react-actioncable-provider";
import { API_ROOT, HEADERS } from "../../constants";

import { selectActiveGameID } from "../../features/activeGame/activeGameSlice";

import NewMessageForm from "./NewMessageForm";

export const InGameChat = () => {
    const activeGameID = useSelector(selectActiveGameID);

    const [messages, setMessages] = useState([]);

    const handleReceivedMessage = (response) => {
        setMessages([...messages, response]);
    };

    const handleConnected = () => {
        console.log("Chat Connected");
        const text = "Player joined";
        fetch(`${API_ROOT}/messages`, {
            method: "POST",
            headers: HEADERS,
            body: JSON.stringify({ message: { text, game_id: activeGameID } }),
        });
    };

    useEffect(() => {
        console.log("test");
    }, [messages]);

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
            </Segment>
            <NewMessageForm activeGameID={activeGameID} />
        </div>
    );
};

export default InGameChat;
