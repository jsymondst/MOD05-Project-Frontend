import React from "react";
import { API_ROOT, HEADERS } from "../../constants";
import { Card, Button, ButtonGroup } from "semantic-ui-react";
import { useDispatch } from "react-redux";

import { join } from "../../features/activeGame/activeGameSlice";

const GameListing = (props) => {
    const {
        name,
        id,
        created_at,
        connection_count,
        game_type,
        closed,
    } = props.game;
    const dispatch = useDispatch();

    const handleDelete = () => {
        fetch(`${API_ROOT}/games/${id}`, {
            method: "DELETE",
            headers: HEADERS,
        });
    };

    const handleJoin = () => {
        const payload = {
            id: id,
            gameType: game_type,
        };
        dispatch(join(payload));
    };

    const gameTypesKey = {
        tictactoe: "Tic Tac Toe",
        connectFour: "Connect Four",
    };

    return (
        <Card fluid>
            <Card.Content>
                <Card.Header>{name}</Card.Header>
                <Card.Meta>created_at:{created_at}</Card.Meta>
                <Card.Description>ID: {id}</Card.Description>
                <Card.Description>
                    Connected players: {connection_count}
                </Card.Description>
                <Card.Description>
                    Type: {gameTypesKey[game_type]}
                </Card.Description>
                <br />
                <Button.Group widths="2">
                    <Button
                        onClick={handleJoin}
                        color="green"
                        disabled={closed}
                    >
                        Join Game
                    </Button>
                    <Button
                        onClick={handleDelete}
                        color="red"
                        disabled={connection_count > 0}
                    >
                        Delete Game
                    </Button>
                </Button.Group>
            </Card.Content>
        </Card>
    );
};

export default GameListing;
