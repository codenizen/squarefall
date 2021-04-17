# Squarefall

A Tetris-like game, inspired by the [Macintosh version of the original](https://www.mobygames.com/game/macintosh/tetris/screenshots).

## Running locally

1. Clone the repository .
2. Run ```npm install```.
3. Run ```npm run build```.
4. Use e.g. [http-server](https://www.npmjs.com/package/http-server) to serve the content of the ```./dist``` folder, then view the output in a browser.

## Leaderboard integration

Squarefall integrates with [Scorepion](https://github.com/pal-foldesi/scorepion), a leaderboard API.
By default, the API runs in the cloud. However, you could also run it locally. On the Squarefall side, you would then need to update the url property of LeaderboardService to point to the local API.

## Linting

[JavaScript Standard Style](https://standardjs.com) is used for linting. The linter can be run with ```npm run lint```.

## Testing

Tests can be run with ```npm run test```.

## Supported browsers

- [Chromium](https://www.chromium.org)
- [Firefox](https://www.mozilla.org/en-US/firefox/)