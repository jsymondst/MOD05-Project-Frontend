import React, { useState } from "react";
import { API_ROOT, HEADERS } from "../../constants";
import {
    Segment,
    Input,
    Dropdown,
    Button,
    Select,
    Label,
    Form,
} from "semantic-ui-react";

const NewGameForm = () => {
    const [name, setName] = useState();
    const [type, setType] = useState("tictactoe");

    const handleChangeName = (e) => {
        setName(e.target.value);
    };

    const handleChangeType = (e, data) => {
        setType(data.value);
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
            { key: "connectFour", text: "Connect Four", value: "connectFour" },
        ];
        return (
            <>
                <br />
                <Label>Game Type</Label>
                <Dropdown
                    label={"Game Type"}
                    labelled
                    options={gameOptions}
                    defaultValue="tictactoe"
                    selection
                    onChange={handleChangeType}
                ></Dropdown>
            </>
        );
    };

    return (
        <Segment padded fluid>
            <Form fluid onSubmit={handleSubmit}>
                <h2>New Game:</h2>
                <Label>Game Name</Label>
                <Input type="text" value={name} onChange={handleChangeName} />
                <br />
                {typeBox()}
                <br />
                <br />

                <Button type="submit">Create Game</Button>
            </Form>
        </Segment>
    );
};

export default NewGameForm;
