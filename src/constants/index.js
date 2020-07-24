export const API_ROOT = "http://localhost:3001";
export const API_WS_ROOT = "ws://localhost:3001/cable";
export const HEADERS = {
    "Content-Type": "application/json",
    Accept: "application/json",
};

export const sendTurn = (gameID, turn, gameType, message) => {
    return fetch(`${API_ROOT}/turns`, {
        method: "POST",
        headers: HEADERS,
        body: JSON.stringify({
            turn: {
                game_id: gameID,
                game_type: gameType,
                action: JSON.stringify(turn),
                message: message,
            },
        }),
    });
    // .then((res) => res.json())
    // .then(console.log);
};
