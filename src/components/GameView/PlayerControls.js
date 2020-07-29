import React, { useState, useEffect } from "react";
import { API_ROOT, sendTurn, HEADERS } from "../../constants";
import { useSelector, useDispatch } from "react-redux";

import {
    leave,
    setPlayer,
    selectActiveGameID,
    selectPlayerNumber,
    selectPlayerName,
    selectActiveGameType,
} from "../../features/activeGame/activeGameSlice";

import { Button, Card, Icon, Segment, Header } from "semantic-ui-react";

const PlayerControls = (props) => {
    const dispatch = useDispatch();
    const playerNumber = useSelector(selectPlayerNumber);
    const playerName = useSelector(selectPlayerName);
    const activeGameID = useSelector(selectActiveGameID);

    const assignPlayer = (newPlayerNumber) => {
        dispatch(setPlayer(newPlayerNumber));

        const action = {
            action: "chosePlayerNumber",
            payload: newPlayerNumber,
        };

        sendTurn(
            activeGameID,
            action,
            "controls",
            `${playerName} chose to play as player ${newPlayerNumber}`
        );
    };

    const rollForTurns = () => {
        let playerNumber = Math.ceil(Math.random() * 2);

        dispatch(setPlayer(playerNumber));

        const action = {
            action: "chosePlayerNumber",
            payload: playerNumber,
        };

        sendTurn(
            activeGameID,
            action,
            "controls",
            `Randomly selected player ${playerNumber}`
        );
    };

    return playerNumber ? (
        <Segment centered>
            <h3>{`Playing as ${playerNumber}`}</h3>
        </Segment>
    ) : (
        <Segment>
            <div>
                {/* <Header floated="left">{"Play as: "}</Header> */}
                <div style={{ float: "left", "margin-right": "0.5em" }}>
                    <h3>{"Play as: "}</h3>
                </div>
                <div style={{ float: "left" }}>
                    <Button.Group floated="left">
                        <Button
                            onClick={() => assignPlayer(1)}
                            padded
                            color="yellow"
                        >
                            Player 1
                        </Button>
                        <Button onClick={rollForTurns} color="green">
                            <Icon name="random" />
                            Random
                        </Button>
                        <Button
                            onClick={() => assignPlayer(2)}
                            padded
                            color="red"
                        >
                            Player 2
                        </Button>
                    </Button.Group>
                </div>
            </div>
            <br />
            <br />
        </Segment>
    );
};

export default PlayerControls;
