window.onload = function() {
  var sudokuDiv = document.getElementById('sudoku')
  var sudokuGrid = createHtmlGrid()
  sudokuDiv.replaceChild(sudokuGrid, sudokuDiv.firstChild)
  sudokuData = createSudoku()
  fillSudoku(sudokuData)
  updateHtml(sudokuData)
}

