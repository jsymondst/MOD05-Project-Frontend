import React from "react";
import { API_ROOT, HEADERS } from "../../constants";
import { Card, Button, ButtonGroup } from "semantic-ui-react";
import { useDispatch } from "react-redux";

import {
    join,
    leave,
    selectActiveGameID,
} from "../../features/activeGame/activeGameSlice";

const GameListing = (props) => {
    const { name, id, created_at, connection_count } = props.game;
    const dispatch = useDispatch();

    const handleDelete = () => {
        fetch(`${API_ROOT}/games/${id}`, {
            method: "DELETE",
            headers: HEADERS,
        });
    };

    const handleJoin = () => {
        dispatch(join(props.game.id));
    };

    return (
        <Card>
            <Card.Content>
                <Card.Header>{name}</Card.Header>
                <Card.Meta>created_at:{created_at}</Card.Meta>
                <Card.Description>ID: {id}</Card.Description>
                <Card.Description>
                    Connected players: {connection_count}
                </Card.Description>
                <br />
                <ButtonGroup>
                    <Button onClick={handleJoin} basic color="green">
                        Join Game
                    </Button>
                    <Button onClick={handleDelete} basic color="red">
                        Delete Game
                    </Button>
                </ButtonGroup>
            </Card.Content>
        </Card>
    );
};

export default GameListing;
