import React from "react";
import { useSelector } from "react-redux";
import { Grid } from "semantic-ui-react";
import { ActionCableConsumer } from "react-actioncable-provider";

import {
    selectActiveGameID,
    selectActiveGameType,
} from "../../features/activeGame/activeGameSlice";

import InGameChat from "./InGameChat";
import GameControls from "./GameControls";
import Tictactoe from "../../features/tictactoe/Tictactoe";
import ConnectFour from "../../features/connectFour/ConnectFour";

export const GameView = (props) => {
    const activeGameID = useSelector(selectActiveGameID);
    const activeGameType = useSelector(selectActiveGameType);

    const activeGameBoard = () => {
        const gameBoardKey = {
            tictactoe: <Tictactoe />,
            connectFour: <ConnectFour />,
        };
        return gameBoardKey[activeGameType];
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
            <Grid padded centered>
                <Grid.Column computer={9} tablet={12} mobile={16} centered>
                    {activeGameBoard()}
                </Grid.Column>
                <Grid.Column computer={7} tablet={12} mobile={16} centered>
                    <GameControls />
                    <InGameChat />
                </Grid.Column>
            </Grid>
        </div>
    );
};

export default GameView;
