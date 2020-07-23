import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ActionCable } from "react-actioncable-provider";

import { place, reset, selectTttGrid, selectTttTurn } from "./tictactoeSlice";
import { selectActiveGameID } from "../../features/activeGame/activeGameSlice";

import { API_ROOT, HEADERS } from "../../constants";

import styles from "./Tictactoe.module.css";

export const Tictactoe = (props) => {
    const grid = useSelector(selectTttGrid);
    const dispatch = useDispatch();
    const turn = useSelector(selectTttTurn);
    const activeGameID = useSelector(selectActiveGameID);

    const drawGrid = () => {
        return grid.map((row, posY) => {
            return row.map((piece, posX) => {
                return (
                    <div
                        key={`${posX}, ${posY}`}
                        className={styles.tttCell}
                        onClick={() => handleTileClick(posX, posY)}
                    >
                        {piece}
                    </div>
                );
            });
        });
    };

    const handleReset = (e) => {
        const action = {
            action: "reset",
        };
        sendTurnAsTurn(action);
        dispatch(reset());
    };

    const sendTurnAsMessage = (turn) => {
        const text = JSON.stringify(turn);
        fetch(`${API_ROOT}/messages`, {
            method: "POST",
            headers: HEADERS,
            body: JSON.stringify({ message: { text, game_id: activeGameID } }),
        });
    };

    const sendTurnAsTurn = (turn) => {
        const text = JSON.stringify(turn);
        fetch(`${API_ROOT}/turns`, {
            method: "POST",
            headers: HEADERS,
            body: JSON.stringify({
                turn: {
                    game_id: activeGameID,
                    game_type: "tictactoe",
                    action: JSON.stringify(turn),
                },
            }),
        });
        // .then((res) => res.json())
        // .then(console.log);
    };

    const checkForWins = () => {
        const winner = null;
        for (let i = 0; i <= 2; i++) {
            // check rows
            if (
                grid[i][0] == grid[i][1] &&
                grid[i][1] == grid[i][2] &&
                grid[i][0] != ""
            ) {
                winner = grid[i][0];
            } else if (
                grid[0][i] == grid[1][i] &&
                grid[1][i] == grid[2][i] &&
                grid[0][i] != ""
            ) {
                winner = grid[0][i];
            }
        }

        return winner;
    };

    const handleTileClick = (posX, posY) => {
        const payload = {
            posX,
            posY,
            piece: turn,
        };
        dispatch(place(payload));
        // sendTurnAsMessage(payload);

        const action = {
            action: "place",
            payload: payload,
        };

        sendTurnAsTurn(action);
    };

    const handleReceivedTurn = (response) => {
        console.table(response);
        // console.log("triggered.");
        const { turn } = response;
        if (response.turn && response.turn.game_type == "tictactoe") {
            const action = JSON.parse(turn.action);
            switch (action.action) {
                case "place":
                    dispatch(place(action.payload));
                    break;
                case "reset":
                    dispatch(reset());
                    break;
                default:
                    console.error("invalid turn received");
            }
        }
    };

    return (
        <div>
            <ActionCable
                channel={{ channel: "TurnsChannel", game_id: activeGameID }}
                onReceived={handleReceivedTurn}
                onConnected={() => console.log("Turn Channel Connected")}
                onDisconnected={() => console.log("Turn Channel DCed")}
            />
            <h1>{turn}</h1>
            <div className={styles.board}>{drawGrid()}</div>
            <button onClick={handleReset}>Reset</button>
        </div>
    );
};

export default Tictactoe;

// Form piece placement stuff.

// const [posX, setPosX] = useState("0");
// const [posY, setPosY] = useState("0");
// const [piece, setPiece] = useState("X");

// const handlePlace = (e) => {
//     e.preventDefault();
//     const payload = {
//         posX: posX,
//         posY: posY,
//         piece: piece,
//     };
//     dispatch(place(payload));
// };

// const drawForm = () => {
//     return (
//         <form onSubmit={handlePlace}>
//             <label>posX</label>
//             <input value={posX} onChange={(e) => setPosX(e.target.value)} />
//             <label>posY</label>
//             <input value={posY} onChange={(e) => setPosY(e.target.value)} />
//             <label>Piece</label>
//             <input
//                 value={piece}
//                 onChange={(e) => setPiece(e.target.value)}
//             />
//             <button type="submit">Place</button>
//         </form>
//     );
// };
