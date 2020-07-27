import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ActionCable } from "react-actioncable-provider";
import { Icon, Button, Grid, Divider, Segment } from "semantic-ui-react";

import {
    connectFourPlace,
    connectFourReset,
    selectConnectFourGrid,
    selectConnectFourTurn,
} from "./connectFourSlice";

import {
    selectActiveGameID,
    setPlayer,
    selectPlayerNumber,
} from "../activeGame/activeGameSlice";

import { API_ROOT, HEADERS } from "../../constants";

export const ConnectFour = () => {
    const dispatch = useDispatch();
    const grid = useSelector(selectConnectFourGrid);
    const turn = useSelector(selectConnectFourTurn);
    const activeGameID = useSelector(selectActiveGameID);
    const playerNumber = useSelector(selectPlayerNumber);
    const [winner, setWinner] = useState(null);

    const drawGrid = () => {
        return grid.map((column, posX) => {
            return (
                <div className="c4Column">
                    {column.reverse().map((piece, posY) => {
                        return (
                            <div
                                className={"c4cell"}
                                onClick={() => {
                                    handleTileClick(posX);
                                }}
                            >
                                {piece}
                            </div>
                        );
                    })}
                </div>
            );
        });
    };

    const drawCell = () => {};

    const handleTileClick = (columnIndex) => {
        const payload = {
            columnIndex: 0,
            piece: "red",
        };
        dispatch(connectFourPlace(payload));
    };

    return (
        <Segment>
            <div className="c4Board">{drawGrid()}</div>
        </Segment>
    );
};

export default ConnectFour;
