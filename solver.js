fillSudoku = function(sudoku) {
  //FIXME this is only mostly correct
  var randomIndexes = getRandomIndexes()
  for (var i = 0; i < 81; i++) {
    var ri = randomIndexes[i]
    var candidates = sudoku.getCandidates(ri)
    var index = Math.floor(random() * candidates.length)
    var candidate = candidates[index]
    sudoku.setCandidate(ri, candidate)
    updateHtml(sudoku)
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

