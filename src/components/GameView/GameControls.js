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
import { ActionCableConsumer } from "react-actioncable-provider";
import { Button, Card, Segment, CardContent } from "semantic-ui-react";

const faker = require("faker/locale/en_GB");

const GameControls = () => {
    const dispatch = useDispatch();
    const playerNumber = useSelector(selectPlayerNumber);
    const playerName = useSelector(selectPlayerName);
    const activeGameID = useSelector(selectActiveGameID);
    const activeGameType = useSelector(selectActiveGameType);
    const [gameStatus, setGameStatus] = useState({
        connections: 0,
        name: null,
    });

    const handleLeave = () => {
        dispatch(leave());
    };

    const assignPlayer = (newPlayerNumber) => {
        dispatch(setPlayer(newPlayerNumber));

        const action = {
            action: "chosePlayerNumber",
            payload: newPlayerNumber,
        };

        sendTurn(
            activeGameID,
            action,
            "players",
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
            "players",
            `Randomly selected player ${playerNumber}`
        );
    };

    const handleReceivedTurn = (response) => {
        const { turn } = response;
        if (turn && turn.game_type) {
            switch (turn.game_type) {
                case "players":
                    const action = JSON.parse(turn.action);
                    switch (action.action) {
                        case "chosePlayerNumber":
                            if (!playerNumber) {
                                const turnSwitch = { "1": "2", "2": "1" };
                                dispatch(setPlayer(turnSwitch[action.payload]));
                            }
                            break;
                        default:
                            console.error("invalid players turn received");
                    }
                    break;
                case "game_status":
                    setGameStatus({
                        connections: turn.action.connections,
                        name: turn.action.name,
                    });
                    break;
                default:
                    break;
            }
        }
    };

    const handleNewGame = () => {
        const action = {
            action: "reset",
        };
        sendTurn(activeGameID, action, "tictactoe", null);
    };

    const requestGameStatus = () => {
        fetch(`${API_ROOT}/games/${activeGameID}`);
    };

    useEffect(requestGameStatus, []);

    const drawGameStatusBlock = () => {
        return (
            <>
                <Card.Content>
                    <Card.Header padded>{gameStatus.name}</Card.Header>
                    <Card.Meta padded>game #{activeGameID}</Card.Meta>
                    <Card.Description>
                        Connected players: {gameStatus.connections}
                    </Card.Description>
                </Card.Content>
            </>
        );
    };

    const drawChoosePlayerblock = () => {
        return playerNumber ? (
            <h3>{`Playing as ${playerNumber}`}</h3>
        ) : (
            <>
                <h3>{"Select a piece"}</h3>
                <Button onClick={() => assignPlayer(1)} padded>
                    Play as player 1
                </Button>
                <br />
                <Button onClick={() => assignPlayer(2)} padded>
                    Play as player 2
                </Button>
                <br />
            </>
        );
    };

    const handleDisconnect = () => {
        console.log("Controls Turn Channel DCed");
        fetch(`${API_ROOT}/messages`, {
            method: "POST",
            headers: HEADERS,
            body: JSON.stringify({
                message: { text: "Disconnected", game_id: activeGameID },
            }),
        });
    };

    return (
        <Card className={"GameControls"}>
            <ActionCableConsumer
                channel={{ channel: "TurnsChannel", game_id: activeGameID }}
                onReceived={handleReceivedTurn}
                onConnected={() =>
                    console.log("Controls Turn Channel Connected")
                }
                onDisconnected={handleDisconnect}
            />

            {drawGameStatusBlock()}
            <Card.Content>
                {drawChoosePlayerblock()}

                <br />
                <Button onClick={handleLeave} padded>
                    Leave Game
                </Button>
                <br />
                <Button onClick={handleNewGame} padded>
                    New Game
                </Button>
            </Card.Content>
        </Card>
    );
};

export default GameControls;
