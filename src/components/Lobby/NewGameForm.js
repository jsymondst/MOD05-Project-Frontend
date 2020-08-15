import React, { useState } from "react";
import { API_ROOT, HEADERS } from "../../constants";
import { Segment, Input, Dropdown, Form } from "semantic-ui-react";

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
    };

    const typeBox = () => {
        const gameOptions = [
            { key: "tictactoe", text: "Tic Tac Toe", value: "tictactoe" },
            { key: "connectFour", text: "Connect Four", value: "connectFour" },
        ];
        return (
            <>
                <Form.Field>
                    <label>Game Type</label>
                    <Dropdown
                        label={"Game Type"}
                        labeled
                        options={gameOptions}
                        defaultValue="tictactoe"
                        selection
                        onChange={handleChangeType}
                    ></Dropdown>
                </Form.Field>
            </>
        );
    };

    return (
        <Segment padded textAlign="left">
            <Form onSubmit={handleSubmit}>
                <h2>New Game:</h2>
                <Form.Field>
                    <label>Game Name</label>
                    <Input
                        type="text"
                        value={name}
                        onChange={handleChangeName}
                    />
                </Form.Field>

                {typeBox()}
                <br />
                <Form.Button type="submit" fluid color={"blue"}>
                    Create Game
                </Form.Button>
            </Form>
        </Segment>
    );
};

export default NewGameForm;
