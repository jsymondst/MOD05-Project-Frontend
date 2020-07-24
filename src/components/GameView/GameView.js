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
import GameControls from "./GameControls";

export const GameView = (props) => {
    const activeGameID = useSelector(selectActiveGameID);
    const dispatch = useDispatch();

    const handleLeave = () => {
        dispatch(leave());
    };

    return (
        <div>
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
            <Grid padded>
                <Grid.Column width={4}>
                    <InGameChat />
                </Grid.Column>
                <Grid.Column width={8} centered>
                    <TicTacToe />
                </Grid.Column>
                <Grid.Column width={4}>
                    <GameControls />
                </Grid.Column>
            </Grid>
        </div>
    );
};

export default GameView;
