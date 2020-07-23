import React from "react";
import "./App.css";
// import Lobby from "./components/Lobby/Lobby";
// import { Tictactoe } from "./features/tictactoe/Tictactoe";
import Main from "./components/Main";

function App() {
    return (
        <div className="App">
            <div className="navbar">
                <h1>Untitled Game Platform</h1>
            </div>
            <Main />
        </div>
    );
}

export default App;
