const getX = function (pieceInfo) {
  return pieceInfo[0][0];
};

const getY = function (pieceInfo) {
  return pieceInfo[0][1];
};

const getName = function (pieceInfo) {
  return pieceInfo[1];
};

const getValidator = function (pieceInfo) {
  // console.log(pieceInfo);
  const validator = validators.find(function (validatorDetails) {
    return validatorDetails[0] === getName(pieceInfo);
  });
  return validator[1];
};

const StatusOf = function (position) {
  const x = position[0];
  const y = position[1];
  return board.find(function (piecePosition) {
    return getX(piecePosition) === x && getY(piecePosition) == y;
  })
};

const nextMove = function (current, direction, step) {
  const xAxisPositions = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  let x = current[0], y = current[1];
  for (let index = 0; index < xAxisPositions.length; index++){
    if (xAxisPositions[index] === current[0]) {
      x = direction === 'up' ? index + step : index - step;
      x = xAxisPositions[x];
    }
  }
  // y = direction === 'up' ? current[1] + step : current[1] - step;
  return [x, y];
};

const pawnMoveValidator = function (from, to) {
  const piece = StatusOf(from);
  const possibleMoves = [
    nextMove(piece[0], 'up', 1)
  ];
  return possibleMoves.some(function (position) {
    return position[0] + position[1] === to;
  });
};

const isValidMove = function (from, to) {
  if (!StatusOf(from)) {
    return false;
  }
  const validator = getValidator(StatusOf(from));
  return validator(from, to);
};

const movePieces = function (from, to) {
  // const validity = isValidMove(from, to);
  // if (validity) {
  //   return changePosition(from, to);
  // }
  return isValidMove(from, to);
};

const board = [
  [['b', 1], 'Pawn'],
  [['b', 2], 'Pawn'],
  [['b', 3], 'Pawn'],
  [['b', 4], 'Pawn'],
  [['b', 5], 'Pawn'],
  [['b', 6], 'Pawn'],
  [['b', 7], 'Pawn'],
  [['b', 8], 'Pawn']
];

const validators = [
  ['Pawn', pawnMoveValidator]
];

console.log(movePieces('b2', 'c2'));
console.log(movePieces('b1', 'c1'));
console.log(movePieces('b1', 'c2'));
console.log(movePieces('a2', 'c2'));