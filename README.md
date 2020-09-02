This is the React Frontend for my online games platform, [Black Horse Games](https://black-horse-games.netlify.app/)

## Concept

Black Horse Games is a multiplayer games platform where users can play games with friends over the web. It has in-game and lobby chat and 2 different game types (tic-tac-toe and connect four). It's responsively styled to display well on desktops, mobiles and tablets.

[Demo link](https://www.youtube.com/watch?v=RVxXg_gi2ts&feature=youtu.be)

[Rails Back End Link](https://github.com/jsymondst/MOD05-Project-Backend)

## Overall Structure

The app has 3 main components:

-   The Header bar
-   The Lobby View, visible when you first connect
-   The Game view, visible when you're connected to a game.

The application (username and game connection status) and game (board/turn state) is managed using Redux, with separate slices for each.

The app is styled using Semantic UI. Mostly because of familiarity, but also because I like its general aesthetic and icons.

### The Header

On the left, the header shows the user's randomly-assigned name, with a simple form to change the name if desired. On the right, it shows the number of users currently connected, tracked on the server and refreshed with the lobby.

### The Lobby

The Lobby has 3 main parts:

-   The 'New Game' Form, where users can choose the game type, set a name and create a game.
-   The Game List, where users can see currently active games, as well as who's connected to them.
-   The lobby chat window.

### The Game View

Once a user connects to a game, they're presented with the game view, which also has three main parts:

-   The Game board, with controls to choose whether to play first or second
-   The Game controls component, which shows the game name, connection status, and has the controls to lock, restart or leave the game.
-   The in game chat window.
