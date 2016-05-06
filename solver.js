fillSudoku = function(sudoku) {
  //FIXME this is only mostly correct
  var randomIndexes = getRandomIndexes()
  for (var i = 0; i < 81; i++) {
    var ri = randomIndexes[i]
    var candidates = sudoku.getCandidates(ri)
    var candidate = getRandomCandidate(candidates)
    sudoku.setCandidate(ri, candidate)
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
      var cellIndex = (i * 9) + j
      var cellValue = (((i * 3) + Math.floor(i / 3) + j) % 9) + 1
      sudoku.setCandidate(cellIndex, cellValue)
      updateHtml(sudoku)
    }
  }
}
