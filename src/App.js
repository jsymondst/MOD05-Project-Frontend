import React from "react";
import "./App.css";
// import Lobby from "./components/Lobby/Lobby";
// import { Tictactoe } from "./features/tictactoe/Tictactoe";
import Main from "./components/Main";
import { Image } from "semantic-ui-react";
import BHGames from "./assets/BHGamesHorse.png";

function App() {
    return (
        <div className="App">
            <div className="navbar">
                <Image src={BHGames} width="60%" centered />
            </div>
            <Main />
        </div>
    );
}

export default App;
