import React from "react";
import { API_ROOT, HEADERS } from "../../constants";
import { Button, Icon, Input } from "semantic-ui-react";

export default class NewMessageForm extends React.Component {
    state = {
        text: "",
    };

    handleChange = (e) => {
        this.setState({ text: e.target.value });
    };

    handleSubmit = (e) => {
        const { text } = this.state;
        const { activeGameID } = this.props;
        e.preventDefault();
        fetch(`${API_ROOT}/messages`, {
            method: "POST",
            headers: HEADERS,
            body: JSON.stringify({ message: { text, game_id: activeGameID } }),
        });
        this.setState({ text: "" });
    };

    render = () => {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <Input
                        type="text"
                        value={this.state.text}
                        onChange={this.handleChange}
                        placeholder={"Chat..."}
                    />
                    <Button icon type="submit">
                        <Icon name="send" />
                    </Button>
                </form>
            </div>
        );
    };
}
