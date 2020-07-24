import React from "react";
import { ActionCableConsumer } from "react-actioncable-provider";
import { API_ROOT } from "../../constants";
import Lobby from "./Lobby";

export default class LobbyConnectionHolder extends React.Component {
    render() {
        return (
            <>
                <ActionCableConsumer channel={{ channel: "GamesChannel" }} />
                <Lobby />
            </>
        );
    }
}
