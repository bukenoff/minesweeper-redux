import * as TYPES from './types';

export const stopGame = () => ({
  type: TYPES.STOP_GAME,
});

export const startGame = () => ({
  type: TYPES.START_GAME,
});

export const openCell = (row: number, col: number) => ({
  type: TYPES.OPEN_CELL,
  row,
  col,
});

export const setCellOpen = (row: number, col: number) => ({
  type: TYPES.SET_CELL_OPEN,
  row,
  col,
});

export const toggleAsBomb = (row: number, col: number, has_bomb: boolean) => ({
  type: TYPES.TOGGLE_AS_BOMB,
  row,
  col,
  has_bomb,
});

export const addToDetected = (row: number, col: number, has_bomb: boolean) => ({
  type: TYPES.ADD_TO_DETECTED,
  row,
  col,
  has_bomb
});

export const removeFromDetected = (row: number, col: number, has_bomb: boolean) => ({
  type: TYPES.REMOVE_FROM_DETECTED,
  row,
  col,
  has_bomb
});

export const startTimer = () => ({
  type: TYPES.START_TIMER,
});

export const stopTimer = () => ({
  type: TYPES.STOP_TIMER,
});
