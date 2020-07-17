import React from "react";
import { API_ROOT, HEADERS } from "../constants";

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
            <li>
                {name}
                <br />
                created_at:{created_at}
                <button onClick={this.handleDelete}>Delete Game</button>
            </li>
        );
    }
}
