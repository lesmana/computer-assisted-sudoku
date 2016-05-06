fillSudoku = function(sudoku) {
  //FIXME this is only mostly correct
  var randomIndexes = getRandomIndexes()
  for (var i = 0; i < 81; i++) {
    var ri = randomIndexes[i]
    var cell = sudoku.getCellByIndex(ri)
    var candidates = sudoku.getCandidates(cell)
    var candidate = getRandomCandidate(candidates)
    sudoku.setCandidate(cell, candidate)
    updateHtml(sudoku)
  }
}

getRandomCandidate = function(candidates) {
  var index = Math.floor(random() * candidates.length)
  var candidate = candidates[index]
  return candidate
}

getRandomIndexes = function() {
  var indexes = []
  for (var i = 0; i < 81; i++) {
    indexes.push(i)
  }
  shuffle(indexes)
  return indexes
}

rootSolution = function(sudoku) {
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      var cell = sudoku.getCellByCoord(i, j)
      var cellValue = (((i * 3) + Math.floor(i / 3) + j) % 9) + 1
      sudoku.setCandidate(cell, cellValue)
      updateHtml(sudoku)
    }
  }
}
