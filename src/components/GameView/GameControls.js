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
import { Button, Card, Icon } from "semantic-ui-react";

import { connectFourReset } from "../../features/connectFour/connectFourSlice";
import { tictactoeReset } from "../../features/tictactoe/tictactoeSlice";

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

    const handleReceivedTurn = (response) => {
        console.log(response);
        const { turn } = response;
        if (turn && turn.game_type) {
            switch (turn.game_type) {
                case "controls":
                    const action = JSON.parse(turn.action);
                    switch (action.action) {
                        case "chosePlayerNumber":
                            if (!playerNumber) {
                                const turnSwitch = { "1": "2", "2": "1" };
                                dispatch(setPlayer(turnSwitch[action.payload]));
                            }
                            break;
                        case "reset":
                            resetAllGames();
                            break;
                        default:
                            console.error("invalid controls turn received");
                    }
                    break;
                case "game_status":
                    setGameStatus({
                        connections: turn.action.connections,
                        name: turn.action.name,
                        closed: turn.action.closed,
                    });
                    break;
                default:
                    break;
            }
        }
    };

    const resetAllGames = () => {
        dispatch(connectFourReset());
        dispatch(tictactoeReset());
        dispatch(setPlayer(null));
    };

    const handleNewGame = () => {
        const action = {
            action: "reset",
        };
        sendTurn(activeGameID, action, "controls", null);
    };

    const requestGameStatus = () => {
        fetch(`${API_ROOT}/games/${activeGameID}`);
    };

    const joinGameTriggers = () => {
        requestGameStatus();
        resetAllGames();
    };

    useEffect(joinGameTriggers, []);

    const handleDisconnect = () => {
        console.log("Controls Turn Channel DCed");
        // fetch(`${API_ROOT}/messages`, {
        //     method: "POST",
        //     headers: HEADERS,
        //     body: JSON.stringify({
        //         message: { text: "Disconnected", game_id: activeGameID },
        //     }),
        // });
    };

    const handleCloseGame = () => {
        fetch(`${API_ROOT}/games/close/${activeGameID}`, {
            method: "POST",
            headers: HEADERS,
            // body: JSON.stringify({
            //     message: { text: "Disconnected", game_id: activeGameID },
            // }),
        });
    };

    const drawGameStatusBlock = () => {
        return (
            <>
                <Card.Content>
                    <Card.Header floated="left">{gameStatus.name}</Card.Header>
                    <Card.Meta>game #{activeGameID}</Card.Meta>
                    <Card.Description floated="left">
                        Connected players: {gameStatus.connections}
                    </Card.Description>
                    <Card.Description floated="left">
                        Closed: {gameStatus.closed ? "True" : "False"}
                    </Card.Description>
                </Card.Content>
                <Card.Content centered>
                    {/* <Segment fluid basic centered> */}
                    <Button.Group centered icon>
                        <Button onClick={handleCloseGame} color="blue">
                            <Icon
                                name={gameStatus.closed ? "unlock" : "lock"}
                            />
                            {gameStatus.closed ? " Unlock Game" : " Lock Game"}
                        </Button>
                        <Button onClick={handleNewGame} color="violet">
                            <Icon name={"refresh"} />
                            {" New Game"}
                        </Button>
                        <Button onClick={handleLeave} color="red">
                            <Icon name={"sign out"} />
                            {" Leave Game"}
                        </Button>
                    </Button.Group>
                    {/* </Segment> */}
                </Card.Content>
            </>
        );
    };

    const drawChoosePlayerblock = () => {
        return playerNumber ? (
            <Card.Content>
                <h3>{`Playing as ${playerNumber}`}</h3>
            </Card.Content>
        ) : (
            <Card.Content>
                <div style={{ float: "left", "margin-right": "0.5em" }}>
                    <h3>{"Play as: "}</h3>
                </div>
                <div style={{ float: "left" }}>
                    <Button.Group>
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
            </Card.Content>
        );
    };

    return (
        <Card fluid>
            <ActionCableConsumer
                channel={{ channel: "TurnsChannel", game_id: activeGameID }}
                onReceived={handleReceivedTurn}
                onConnected={() =>
                    console.log("Controls Turn Channel Connected")
                }
                onDisconnected={handleDisconnect}
            />

            {drawGameStatusBlock()}
            {/* {drawChoosePlayerblock()} */}
        </Card>
    );
};

export default GameControls;
