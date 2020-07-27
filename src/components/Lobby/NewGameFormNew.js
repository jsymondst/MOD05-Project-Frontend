import React, { useState } from "react";
import { API_ROOT, HEADERS } from "../../constants";
import {
    Segment,
    Input,
    Dropdown,
    Button,
    Select,
    Label,
} from "semantic-ui-react";

const NewGameForm = () => {
    const [name, setName] = useState();
    const [type, setType] = useState();

    const handleChangeName = (e) => {
        setName(e.target.value);
    };

    const handleChangeType = (e) => {
        setType(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`${API_ROOT}/games`, {
            method: "POST",
            headers: HEADERS,
            body: JSON.stringify({ game: { name, game_type: type } }),
        });
        setName("");
        setType("");
    };

    const typeBox = () => {
        const gameOptions = [
            { key: "tictactoe", text: "Tic Tac Toe", value: "tictactoe" },
            { key: "fourinarow", text: "Connect Four", value: "fourinarow" },
        ];
        return (
            <>
                <br />
                <Label>Game Type</Label>
                <Select
                    label={"Game Type"}
                    labelled
                    options={gameOptions}
                    defaultValue="tictactoe"
                    onChange={handleChangeType}
                ></Select>
            </>
        );
    };

    return (
        <Segment padded>
            <form onSubmit={handleSubmit}>
                <h2>New Game:</h2>
                <Label>Game Name</Label>
                <Input type="text" value={name} onChange={handleChangeName} />
                <br />
                {typeBox()}
                <br />
                <br />

                <Button type="submit">Create Game</Button>
            </form>
        </Segment>
    );
};

export default NewGameForm;
