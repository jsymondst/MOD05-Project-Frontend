import React from "react";
import { API_ROOT, HEADERS } from "../constants";

export default class NewGameForm extends React.Component {
    state = {
        name: "",
    };

    handleChange = (e) => {
        this.setState({ name: e.target.value });
    };

    handleSubmit = (e) => {
        const { name } = this.state;
        e.preventDefault();
        fetch(`${API_ROOT}/games`, {
            method: "POST",
            headers: HEADERS,
            body: JSON.stringify({ game: { name } }),
        });
        this.setState({ name: "" });
    };

    render = () => {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>New Game:</label>
                    <br />
                    <input
                        type="text"
                        value={this.state.name}
                        onChange={this.handleChange}
                    />
                    <input type="submit" />
                </form>
            </div>
        );
    };
}
