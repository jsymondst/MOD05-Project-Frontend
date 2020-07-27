import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Icon, Input } from "semantic-ui-react";

import {
    selectPlayerName,
    setPlayerName,
} from "../../features/activeGame/activeGameSlice";

import { randomAnimal } from "../../constants";
const faker = require("faker/locale/en_GB");

const PlayerNameForm = () => {
    const playerName = useSelector(selectPlayerName);
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
        dispatch(setPlayerName(newPlayerName));

        setEditable(false);
    };

    const staticName = () => {
        return (
            <>
                <h3>
                    {`${playerName} `}
                    <Button
                        icon="edit"
                        onClick={toggleEditable}
                        basic
                        centered
                    />
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
