fillSudoku = function(sudoku) {
  //FIXME this is only mostly correct
  var randomIndexes = getRandomIndexes()
  for (var i = 0; i < 81; i++) {
    var ri = randomIndexes[i]
    var cell = sudoku.cells[ri]
    setRandomCandidate(cell)
    updateHtml(sudoku)
  }
}

setRandomCandidate = function(cell) {
  var candidates = []
  for (var i = 0; i < 9; i++) {
    var maybeCandidate = cell.candidates[i]
    if (maybeCandidate != 0) {
      candidates.push(maybeCandidate)
    }
  }
  var index = Math.floor(random() * candidates.length)
  var candidate = candidates[index]
  for (var i = 0; i < 9; i++) {
    cell.candidates[i] = 0
  }
  cell.candidates[candidate - 1] = candidate
  for (var i = 0; i < 20; i++) {
    var neighbour = cell.neighbours[i]
    neighbour.candidates[candidate - 1] = 0
  }
}

getRandomIndexes = function() {
  var indexes = []
  for (var i = 0; i < 81; i++) {
    indexes.push(i)
  }
  shuffle(indexes)
  return indexes
}

