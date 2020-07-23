import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Button } from "semantic-ui-react";

import {
    join,
    leave,
    selectActiveGameID,
} from "../../features/activeGame/activeGameSlice";

import InGameChat from "./InGameChat";
import TicTacToe from "../../features/tictactoe/Tictactoe";
import { ActionCable, ActionCableConsumer } from "react-actioncable-provider";

export const GameView = (props) => {
    const activeGameID = useSelector(selectActiveGameID);
    const dispatch = useDispatch();

    const handleLeave = () => {
        dispatch(leave());
    };

    return (
        <div>
            <h1>Connected to game #{activeGameID}</h1>
            <Button onClick={handleLeave}>Leave Game</Button>
            <ActionCableConsumer
                channel={{ channel: "TurnsChannel", game_id: activeGameID }}
                // onReceived={console.log}
            />
            <ActionCableConsumer
                channel={{
                    channel: "MessagesChannel",
                    game_id: activeGameID,
                }}
            />
            <Grid>
                <Grid.Column width={4}>
                    <InGameChat />
                </Grid.Column>
                <Grid.Column width={8}>
                    <TicTacToe />
                </Grid.Column>
            </Grid>
        </div>
    );
};

export default GameView;
