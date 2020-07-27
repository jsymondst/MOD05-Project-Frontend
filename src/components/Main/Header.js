import React from "react";
import BHGames from "../../assets/BHGamesHorse.png";
import { Image, Grid } from "semantic-ui-react";
import PlayerNameForm from "./PlayerNameForm";
import { MiddlewareArray } from "@reduxjs/toolkit";

const Header = () => {
    return (
        <div className="navbar">
            {/* <Image src={BHGames} width="60%" centered /> */}
            <Grid verticalAlign={"middle"} centered>
                <Grid.Column width={3}>
                    <PlayerNameForm />
                </Grid.Column>
                <Grid.Column width={9}>
                    <Image src={BHGames} width="90%" centered />
                </Grid.Column>
                <Grid.Column width={3}></Grid.Column>
            </Grid>
        </div>
    );
};

export default Header;
