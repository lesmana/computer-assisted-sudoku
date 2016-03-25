fillSudoku = function(sudoku) {
  //FIXME this is only mostly correct
  var randomIndexes = getRandomIndexes()
  for (var i = 0; i < 81; i++) {
    var ri = randomIndexes[i]
    setRandomCandidate(sudoku, ri)
    updateHtml(sudoku)
  }
}

setRandomCandidate = function(sudoku, ci) {
  var candidates = sudoku.getCandidates(ci)
  var index = Math.floor(random() * candidates.length)
  var candidate = candidates[index]
  sudoku.setCandidate(ci, candidate)
}

getRandomIndexes = function() {
  var indexes = []
  for (var i = 0; i < 81; i++) {
    indexes.push(i)
  }
  shuffle(indexes)
  return indexes
}

