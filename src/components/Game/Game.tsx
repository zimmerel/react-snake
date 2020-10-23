import React from "react";
import { GameSettings } from "../../types";
import Grid from "../Grid";
import Snake from "../Snake";
import useGame from "./useGame";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  score: {
    position: "absolute",
    bottom: "5px",
    right: "5px",
    fontSize: "30px",
    color: "#43568B"
  },
  core: {
    backgroundColor: "yellow",
    borderRadius: "75%"
  },
  board: {
    position: "relative",
    backgroundColor: "#4E89AE",
    border: "3px solid #43568B",
    display: "grid",
    height: "300px",
    width: "300px"
  },
  result: {
    right: "50%",
    fontSize: "30px",
    position: "absolute",
    color: "#43568B"
  }
});

interface Props extends Partial<GameSettings> {}

const messages = {
  LOST: "Game Over!",
  IDLE: "| |",
  WON: "You Won!"
};

export default function Game(props: Props) {
  const { boardSize, snakeQueue, corePosition, score, gameState } = useGame({});
  const classes = useStyles();

  const gridDimensions = { rows: boardSize, cols: boardSize };

  return (
    <Grid className={classes.board} size={gridDimensions}>
      <div className={classes.result}>
        <strong>{messages[gameState] || ""}</strong>
      </div>
      <Grid.Cell position={corePosition} className={classes.core} />
      <Snake snakeQueue={snakeQueue} />
      <div className={classes.score}>{score}</div>
    </Grid>
  );
}
