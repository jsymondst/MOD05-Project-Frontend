import React from "react";
import { API_ROOT, HEADERS } from "../../constants";
import { Card, Button, ButtonGroup } from "semantic-ui-react";

export default class GameListing extends React.Component {
    handleDelete = (e) => {
        const { id } = this.props.game;

        fetch(`${API_ROOT}/games/${id}`, {
            method: "DELETE",
            headers: HEADERS,
        });
    };

    handleJoin = (e) => {
        const { game, gameListMethods } = this.props;

        gameListMethods.joinGame(game.id);
    };

    render() {
        const { name, id, created_at, connection_count } = this.props.game;
        return (
            <Card>
                <Card.Content>
                    <Card.Header>{name}</Card.Header>
                    <Card.Meta>created_at:{created_at}</Card.Meta>
                    <Card.Description>ID: {id}</Card.Description>
                    <Card.Description>
                        Connected players: {connection_count}
                    </Card.Description>

                    <ButtonGroup>
                        <Button onClick={this.handleJoin} basic color="green">
                            Join Game
                        </Button>
                        <Button onClick={this.handleDelete} basic color="red">
                            Delete Game
                        </Button>
                    </ButtonGroup>
                </Card.Content>
            </Card>
        );
    }
}
