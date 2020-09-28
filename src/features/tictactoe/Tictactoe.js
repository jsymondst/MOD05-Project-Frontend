import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { ActionCable } from "react-actioncable-provider";
import { Icon, Segment } from "semantic-ui-react";

import {
    place,
    tictactoeReset,
    selectTttGrid,
    selectTttTurn,
    selectTttWinner,
} from "./tictactoeSlice";

import {
    selectActiveGameID,
    setPlayer,
    selectPlayerNumber,
} from "../../features/activeGame/activeGameSlice";

import { API_ROOT, HEADERS } from "../../constants";

// import styles from "./Tictactoe.module.css";
import PlayerControls from "../../components/GameView/PlayerControls";

export const Tictactoe = (props) => {
    const grid = useSelector(selectTttGrid);
    const dispatch = useDispatch();
    const turn = useSelector(selectTttTurn);
    const winner = useSelector(selectTttWinner);
    const activeGameID = useSelector(selectActiveGameID);
    const playerNumber = useSelector(selectPlayerNumber);
    // const [winner, setWinner] = useState(null);

    const iconDetails = {
        "1": { color: "blue", icon: "cancel" },
        "2": { color: "red", icon: "circle outline" },
    };

    const drawGrid = () => {
        return grid.map((row, posY) => {
            return row.map((piece, posX) => {
                return drawCell(piece, posX, posY);
            });
        });
    };

    const substituteIcon = (piece, size) => {
        const selectIcon = {
            X: <Icon name="cancel" color="blue" size={size} />,
            O: <Icon name="circle outline" color="red" size={size} />,
        };
        return selectIcon[piece];
    };

    const myTurn = () => {
        if (playerNumber === -1) {
            return true
        } else {
            const key = {
                X: 1,
                O: 2,
            };
            return Number(playerNumber) === key[turn];
        }
    };

    const drawCell = (piece, posX, posY) => {
        // const assignTileHandler = () => {
        //     if (myTurn() && !winner) {
        //         return () => handleTileClick(posX, posY);
        //     }
        // };

        return (
            <div
                // className={myTurn() ? "tttCell active" : "tttCell"}
                className={"tttCell"}
                key={`${posX}, ${posY}`}
                onClick={!piece ? () => handleTileClick(posX, posY) : null}
                // onClick={assignTileHandler()}
            >
                {substituteIcon(piece, "huge")}
            </div>
        );
    };

    const sendTictactoeTurn = (turn) => {
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

    const handleTileClick = (posX, posY) => {
        if (!winner && myTurn()) {
            const payload = {
                posX,
                posY,
                piece: turn,
            };
            dispatch(place(payload));

            const action = {
                action: "place",
                payload: payload,
            };
            sendTictactoeTurn(action);
        }
    };

    const handleReceivedTurn = (response) => {
        console.table(response);
        // console.log("triggered.");
        const { turn } = response;
        if (response.turn && response.turn.game_type === "tictactoe") {
            const action = JSON.parse(turn.action);
            switch (action.action) {
                case "place":
                    dispatch(place(action.payload));
                    break;
                case "reset":
                    dispatch(tictactoeReset());
                    dispatch(setPlayer(null));
                    break;
                default:
                    console.error("invalid tictactoe turn received");
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
            return <h1>{substituteIcon(turn, "big")}</h1>;
        }
    };

    return (
        <Segment.Group centered>
            <PlayerControls myTurn={myTurn()} iconDetails={iconDetails} />
            <Segment>
                <ActionCable
                    channel={{ channel: "TurnsChannel", game_id: activeGameID }}
                    onReceived={handleReceivedTurn}
                    onConnected={() =>
                        console.log("TTT Turn Channel Connected")
                    }
                    onDisconnected={() => console.log("TTT Turn Channel DCed")}
                />
                {headerSection()}
                <div className="boardbox">
                    <div className={"board"}>{drawGrid()}</div>
                </div>
            </Segment>
        </Segment.Group>
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

// const handleReset = (e) => {
//     const action = {
//         action: "reset",
//     };
//     sendTictactoeTurn(action);
//     dispatch(tictactoeReset());
// };

// const sendTurnAsMessage = (turn) => {
//     const text = JSON.stringify(turn);
//     fetch(`${API_ROOT}/messages`, {
//         method: "POST",
//         headers: HEADERS,
//         body: JSON.stringify({ message: { text, game_id: activeGameID } }),
//     });
// };
