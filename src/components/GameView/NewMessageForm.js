import React, { useState } from "react";
import { API_ROOT, HEADERS } from "../../constants";
import { Input } from "semantic-ui-react";
import { useSelector } from "react-redux";

import { selectPlayerName } from "../../features/activeGame/activeGameSlice";

export const NewMessageForm = (props) => {
    const playerName = useSelector(selectPlayerName);
    const [text, setText] = useState("");

    const handleChange = (e) => {
        setText(e.target.value);
    };

    const handleSubmit = (e) => {
        const { activeGameID } = props;
        e.preventDefault();
        if (text !== "") {
            fetch(`${API_ROOT}/messages`, {
                method: "POST",
                headers: HEADERS,
                body: JSON.stringify({
                    message: {
                        text: text,
                        game_id: activeGameID,
                        message_type: "chat",
                        username: playerName,
                    },
                }),
            });

            setText("");
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Input
                    fluid
                    type="text"
                    value={text}
                    onChange={handleChange}
                    placeholder={"Chat..."}
                    action={{
                        icon: "send",
                        type: "submit",
                        color: "blue",
                    }}
                    actionPosition="left"
                ></Input>
            </form>
        </div>
    );
};

export default NewMessageForm;
