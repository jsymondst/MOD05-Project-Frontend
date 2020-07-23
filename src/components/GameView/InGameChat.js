import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Segment } from "semantic-ui-react";
import { ActionCable } from "react-actioncable-provider";

import {
    join,
    leave,
    selectActiveGameID,
} from "../../features/activeGame/activeGameSlice";

import NewMessageForm from "./NewMessageForm";

export const InGameChat = () => {
    const activeGameID = useSelector(selectActiveGameID);

    const [messages, setMessages] = useState([]);

    const handleReceivedMessage = (response) => {
        setMessages([...messages, response]);
    };

    return (
        <div>
            <ActionCable
                channel={{
                    channel: "MessagesChannel",
                    game_id: activeGameID,
                }}
                onReceived={handleReceivedMessage}
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
