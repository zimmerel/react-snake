import { GameSettings } from "../types";
import {
  initializeGameAction,
  GameAction,
  consumeAction,
  moveSnake,
  accelerateAction,
  turnAction,
  loseGameAction,
  pauseGameAction,
  playGameAction
} from "./actions";

export function gameReducer(state: GameSettings, action: GameAction) {
  switch (action.type) {
    case "INIT_GAME":
      return initializeGameAction(state, action);
    case "TURN":
      return turnAction(state, action);
    case "CONSUME":
      return consumeAction(state);
    case "PAUSE":
      return pauseGameAction(state, action);
    case "PLAY":
      return playGameAction(state, action);
    case "MOVE":
      return moveSnake(state);
    case "LOSE":
      return loseGameAction(state, action);
    case "BOOST":
      return accelerateAction(state, action);
    default:
      return state;
  }
}
