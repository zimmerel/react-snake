import { useCallback, useEffect, useReducer } from "react";
import { gameReducer, initializeGame } from "../../state";
import useInterval from "../../hooks/useInterval";
import { InitialGameSettings } from "../../types";
import { hasIntersect } from "../../util/position";

const keyDirections = Object.freeze({
  Right: "right",
  ArrowRight: "right",
  d: "right",
  Left: "left",
  ArrowLeft: "left",
  a: "left",
  Up: "up",
  ArrowUp: "up",
  w: "up",
  Down: "down",
  ArrowDown: "down",
  s: "down"
});

export default function useGame(settings: InitialGameSettings) {
  const [state, dispatch] = useReducer(gameReducer, settings, initializeGame);
  const {
    boardSize,
    gameState,
    snakeQueue,
    corePosition,
    speed,
    score,
    direction,
    boost
  } = state;

  useInterval(() => {
    if (gameState === "PLAYING") {
      if (hasIntersect(snakeQueue)) {
        dispatch({ type: "LOSE" });
      } else {
        dispatch({ type: "MOVE" });
      }
    }
  }, 1000 / (speed + boost));

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "p") {
        dispatch({ type: "PAUSE" });
      } else {
        dispatch({ type: "PLAY" });
      }
      if (keyDirections[e.key]) {
        if (keyDirections[e.key] === direction) {
          dispatch({ type: "BOOST", amount: 3 });
        } else {
          dispatch({ type: "TURN", direction: keyDirections[e.key] });
        }
      }
    },
    [direction]
  );

  const onKeyUp = useCallback(() => {
    dispatch({ type: "BOOST", amount: 0 });
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [onKeyDown, onKeyUp]);

  return {
    state,
    dispatch,
    boardSize,
    snakeQueue,
    corePosition,
    gameState,
    score
  };
}
