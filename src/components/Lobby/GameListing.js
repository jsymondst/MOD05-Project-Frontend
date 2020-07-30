import React from "react";
import { API_ROOT, HEADERS } from "../../constants";
import { Card, Button, ButtonGroup, Icon } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import moment from "moment";

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

    const formattedCreationTime = moment(created_at).format("DD/MM/YY h:mm a");

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
                <Card.Meta>created: {formattedCreationTime}</Card.Meta>
                <Card.Description>ID: {id}</Card.Description>
                <Card.Description>
                    Connected players: {connection_count}
                </Card.Description>
                <Card.Description>
                    Type: {gameTypesKey[game_type]}
                </Card.Description>
                <br />
                <Button.Group fluid widths={2} icon>
                    <Button
                        onClick={handleJoin}
                        color="green"
                        disabled={closed}
                    >
                        <Icon name="sign in" />
                        {" Join Game"}
                    </Button>
                    <Button
                        onClick={handleDelete}
                        color="red"
                        disabled={connection_count > 0}
                    >
                        {"Delete Game "}
                        <Icon name="ban" />
                    </Button>
                </Button.Group>
            </Card.Content>
        </Card>
    );
};

export default GameListing;
