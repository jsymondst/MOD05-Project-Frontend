import React from "react";
import { API_ROOT, HEADERS } from "../constants";
import { Card, Button } from "semantic-ui-react";

export default class GameListing extends React.Component {
    handleDelete = (e) => {
        const { id } = this.props.game;

        fetch(`${API_ROOT}/games/${id}`, {
            method: "DELETE",
            headers: HEADERS,
        });
    };

    render() {
        const { name, id, created_at } = this.props.game;
        return (
            <Card>
                <Card.Content>
                    <Card.Header>{name}</Card.Header>
                    <Card.Meta>created_at:{created_at}</Card.Meta>
                    <Button onClick={this.handleDelete}>Delete Game</Button>
                </Card.Content>
            </Card>
        );
    }
}
