import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Input } from "semantic-ui-react";

import {
    selectPlayerName,
    setPlayerName,
    selectActiveGameID,
} from "../../features/activeGame/activeGameSlice";

import { randomAnimal, sendMessage } from "../../constants";
const faker = require("faker/locale/en_GB");

const PlayerNameForm = () => {
    const playerName = useSelector(selectPlayerName);
    const activeGameID = useSelector(selectActiveGameID);
    const dispatch = useDispatch();

    const [editable, setEditable] = useState();
    const [newPlayerName, setNewPlayerName] = useState(playerName);

    const setName = () => {
        const name = `${faker.hacker.adjective()}-${randomAnimal()}`;
        dispatch(setPlayerName(name));
    };

    useEffect(setName, []);

    const handleChange = (e) => {
        setNewPlayerName(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const message = {
            username: "system",
            message_type: "namechange",
            text: `${playerName} changed their name to ${newPlayerName}`,
            gameID: activeGameID ? activeGameID : 1,
        };
        sendMessage(message);

        dispatch(setPlayerName(newPlayerName));

        setEditable(false);
    };

    const staticName = () => {
        return (
            <>
                <h3>
                    {`${playerName} `}
                    <Button icon="edit" onClick={toggleEditable} basic />
                </h3>
            </>
        );
    };

    const editableName = () => {
        return (
            <form onSubmit={handleSubmit}>
                <Input big value={newPlayerName} onChange={handleChange} />
                <Button icon="edit" type="submit" basic></Button>
            </form>
        );
    };

    const toggleEditable = () => {
        setNewPlayerName(playerName);
        setEditable(true);
    };

    return (
        <div>
            <h4>Connected as:</h4>
            {editable ? editableName() : staticName()}
        </div>
    );
};

export default PlayerNameForm;
