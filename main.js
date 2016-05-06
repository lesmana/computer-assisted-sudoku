bodyOnload = function() {
  var sudokuDiv = document.getElementById('sudoku')
  var sudokuGrid = createHtmlGrid()
  sudokuDiv.replaceChild(sudokuGrid, sudokuDiv.firstChild)
  sudokuData = new Sudoku()
  fillSudoku(sudokuData)
  updateHtml(sudokuData)
}

