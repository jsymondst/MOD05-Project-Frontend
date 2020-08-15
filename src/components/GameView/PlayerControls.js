import React from "react";
import { sendTurn } from "../../constants";
import { useSelector, useDispatch } from "react-redux";

import {
    setPlayer,
    selectActiveGameID,
    selectPlayerNumber,
    selectPlayerName,
} from "../../features/activeGame/activeGameSlice";

import { Button, Icon, Segment } from "semantic-ui-react";

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
            `${playerName} randomly selected player ${playerNumber}`
        );
    };

    return playerNumber ? (
        <Segment centered>
            <h3>
                {`Playing as `}
                <Icon
                    name={props.iconDetails[playerNumber].icon}
                    color={props.iconDetails[playerNumber].color}
                />
            </h3>
        </Segment>
    ) : (
        <Segment>
            <div>
                {/* <Header floated="left">{"Play as: "}</Header> */}
                <div style={{ float: "left", marginRight: "0.5em" }}>
                    <h3>{"Play as: "}</h3>
                </div>
                <div style={{ float: "left" }}>
                    <Button.Group floated="left" labeled icon width={2}>
                        <Button
                            onClick={() => assignPlayer(1)}
                            padded
                            color={props.iconDetails[1].color}
                        >
                            <Icon name={props.iconDetails[1].icon} />
                            Player 1
                        </Button>
                        <Button onClick={rollForTurns} color="green">
                            <Icon name="random" />
                            Random
                        </Button>
                        <Button
                            onClick={() => assignPlayer(2)}
                            padded
                            color={props.iconDetails[2].color}
                        >
                            <Icon name={props.iconDetails[2].icon} />
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
