import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ActionCable } from "react-actioncable-provider";
import {
    Icon,
    Button,
    Grid,
    Divider,
    Segment,
    Header,
} from "semantic-ui-react";

import {
    connectFourPlace,
    connectFourReset,
    selectConnectFourGrid,
    selectConnectFourTurn,
    selectConnectFourWinner,
} from "./connectFourSlice";

import {
    selectActiveGameID,
    setPlayer,
    selectPlayerNumber,
} from "../activeGame/activeGameSlice";

import { API_ROOT, HEADERS, sendTurn } from "../../constants";
import PlayerControls from "../../components/GameView/PlayerControls";

export const ConnectFour = () => {
    const dispatch = useDispatch();
    const grid = useSelector(selectConnectFourGrid);
    const turn = useSelector(selectConnectFourTurn);
    const activeGameID = useSelector(selectActiveGameID);
    const playerNumber = useSelector(selectPlayerNumber);
    const winner = useSelector(selectConnectFourWinner);

    const iconDetails = {
        "1": { color: "yellow", icon: "circle" },
        "2": { color: "red", icon: "circle" },
    };

    const substituteIcon = (piece, size) => {
        const selectIcon = {
            red: <Icon name="circle" color="red" size={size} />,
            yellow: <Icon name="circle" color="yellow" size={size} />,
        };
        return selectIcon[piece];
    };

    const myTurn = () => {
        return Number(turn) === Number(playerNumber);
    };

    const drawGrid = () => {
        return (
            <div className="c4Board">
                {grid.map((column, posX) => {
                    const gridColumn = column.map((piece, posY) => {
                        return drawCell(piece, posX, posY);
                    });

                    gridColumn.reverse();

                    return (
                        <div
                            className={
                                myTurn() ? "c4Column active" : "c4Column"
                            }
                        >
                            {gridColumn}
                        </div>
                    );
                })}
            </div>
        );
    };

    const drawCell = (piece, posX, posY) => {
        const assignTileHandler = () => {
            if (myTurn()) {
                return () => handleTileClick(posX);
            }
        };

        return (
            <div
                className={"c4cell"}
                key={`${posX}, ${posY}`}
                onClick={assignTileHandler()}
            >
                {piece !== "blank" ? substituteIcon(piece, "huge") : null}
            </div>
        );
    };

    const pieceSwitch = (turn) => {
        const pieceSwitchKey = {
            "1": "yellow",
            "2": "red",
        };
        return pieceSwitchKey[turn];
    };

    const handleTileClick = (columnIndex) => {
        const payload = {
            columnIndex,
            piece: pieceSwitch(turn),
        };
        // dispatch(connectFourPlace(payload));

        const action = {
            action: "place",
            payload,
        };
        sendTurn(activeGameID, action, "connectFour", null);
    };

    const handleReceivedTurn = (response) => {
        console.table(response);
        // console.log("triggered.");
        const { turn } = response;
        if (response.turn && response.turn.game_type == "connectFour") {
            const action = JSON.parse(turn.action);
            switch (action.action) {
                case "place":
                    dispatch(connectFourPlace(action.payload));
                    break;
                case "reset":
                    dispatch(connectFourReset());
                    dispatch(setPlayer(null));
                    break;
                default:
                    console.error("invalid connectFour turn received");
            }
        }
    };

    const headerSection = () => {
        if (!playerNumber) {
            return <h1>Select a player</h1>;
        } else if (winner) {
            return (
                <h1>
                    {substituteIcon(winner, "big")}
                    {` Wins!`}
                </h1>
            );
        } else {
            return <h1>{substituteIcon(pieceSwitch(turn), "big")}</h1>;
        }
    };

    return (
        <Segment.Group>
            <PlayerControls myTurn={myTurn()} iconDetails={iconDetails} />
            <Segment padded centered>
                <ActionCable
                    channel={{ channel: "TurnsChannel", game_id: activeGameID }}
                    onReceived={handleReceivedTurn}
                    onConnected={() => console.log("C4 Turn Channel Connected")}
                    onDisconnected={() => console.log("C4 Turn Channel DCed")}
                />
                {headerSection()}
                <div className="boardbox">{drawGrid()}</div>
            </Segment>
        </Segment.Group>
    );
};

export default ConnectFour;
