import React from "react";
import { ActionCableConsumer } from "react-actioncable-provider";
// import { API_ROOT } from "../../constants";
import Main from "./Main";

export default class MainConnectionHolder extends React.Component {
    render() {
        return (
            <>
                <ActionCableConsumer channel={{ channel: "GamesChannel" }} />
                {/* <ActionCableConsumer
                    channel={{
                        channel: "MessagesChannel",
                        game_id: 1,
                    }}
                /> */}

                <Main />
            </>
        );
    }
}
