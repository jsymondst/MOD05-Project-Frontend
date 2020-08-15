import React from "react";
import BHGames from "../../assets/BHGamesHorse.png";
import { Image, Grid } from "semantic-ui-react";
import PlayerNameForm from "./PlayerNameForm";
import ConnectionTracker from "./ConnectionTracker";

const Header = () => {
    return (
        <div className="navbar">
            <Grid verticalAlign={"middle"} centered>
                <Grid.Row>
                    <Grid.Column width={16} only="mobile" textAlign="center">
                        <Image src={BHGames} width="90%" centered />
                    </Grid.Column>
                    <Grid.Column computer={4} tablet={4} mobile={8}>
                        <PlayerNameForm />
                    </Grid.Column>
                    <Grid.Column width={7} only="tablet computer">
                        <Image src={BHGames} width="90%" centered />
                    </Grid.Column>
                    <Grid.Column computer={4} tablet={4} mobile={8}>
                        <ConnectionTracker />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    );
};

export default Header;
