import {
  takeLatest,
  put,
  select,
  call,
  delay
} from 'redux-saga/effects';
import * as TYPES from './types';
import * as actionCreators from './actions';

const getMines = state => state.minesweeper.mines;
const getCellsClosed = state => state.minesweeper.cells_closed;
const getBombs = state => state.minesweeper.bombs;

// recursive saga
function* openCellRecursive(row, col) {
  const mines = yield select(getMines);
  const this_cell = mines[row][col];

  yield put(actionCreators.setCellOpen(row, col));

  yield delay(10);

  if (this_cell.neighbours.length) {
    for (let i = 0; i < this_cell.neighbours.length; i++) {
      const { row: this_row, col: this_col } = this_cell.neighbours[i];
      const neighbour_cell = mines[this_row][this_col];
      // recursion should happen only if cell is empty
      if (neighbour_cell.bombs_around === 0 && !neighbour_cell.open) {
        yield call(openCellRecursive, this_row, this_col);
      } else if (neighbour_cell.bombs_around !== 0 && !neighbour_cell.open) {
        yield put(actionCreators.setCellOpen(this_row, this_col));
      } else {
        console.log('no recursion');
      }
    }
  }
  console.log('recursive saga ends');
}

function* openCellSaga({ row, col }: ReturnType<typeof actionCreators.openCell>) {
  const mines = yield select(getMines);
  const cells_closed = yield select(getCellsClosed);
  const bombs = yield select(getBombs);
  const this_cell = mines[row][col];

  if (cells_closed === 81) {
    yield put(actionCreators.startTimer());
  }
  // stop game once app rans into cell with bomb
  // and quit saga as well
  if (this_cell.has_bomb) {
    yield put(actionCreators.stopTimer());
    yield put(actionCreators.stopGame());
    return;
  }

  // recursion starts
  yield call(openCellRecursive, row, col);

  if (cells_closed === bombs + 1) {
    yield put(actionCreators.stopTimer());
    yield put(actionCreators.stopGame());
  }
  console.log('open cell saga ends. cells_closed is', cells_closed);
}

function* flow() {
  yield takeLatest(TYPES.OPEN_CELL, openCellSaga);
}

export default function* rootSaga() {
  yield flow();
}
