import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Input, Segment, Form, Header } from "semantic-ui-react";

import {
    selectPlayerName,
    setPlayerName,
    selectActiveGameID,
} from "../../features/activeGame/activeGameSlice";

import { randomAnimal, sendMessage } from "../../constants";
// const faker = require("faker/locale/en_GB");

const PlayerNameForm = () => {
    const playerName = useSelector(selectPlayerName);
    const activeGameID = useSelector(selectActiveGameID);
    const dispatch = useDispatch();

    const [editable, setEditable] = useState();
    const [newPlayerName, setNewPlayerName] = useState(playerName);

    const setName = () => {
        // const name = `${faker.hacker.adjective()}-${randomAnimal()}`;
        const name = `anonymous-${randomAnimal()}`;

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
            <h3>
                {`${playerName} `}
                <Button icon="edit" onClick={toggleEditable} basic />
            </h3>
        );
    };

    const editableName = () => {
        return (
            <Form onSubmit={handleSubmit} centered>
                <Input big value={newPlayerName} onChange={handleChange} />
                <Button icon="edit" type="submit" basic></Button>
            </Form>
        );
    };

    const toggleEditable = () => {
        setNewPlayerName(playerName);
        setEditable(true);
    };

    return (
        <Segment basic textAlign="center" fluid>
            <Header as="h4">Connected as:</Header>
            {editable ? editableName() : staticName()}
        </Segment>
    );
};

export default PlayerNameForm;
