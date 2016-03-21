window.onload = function() {
  var sudokuDiv = document.getElementById('sudoku')
  var sudokuTable = createTable()
  sudokuDiv.replaceChild(sudokuTable, sudokuDiv.firstChild)
}

createTable = function() {
  var table = document.createElement('table')
  for (var x = 0; x < 9; x++) {
    var tr = document.createElement('tr')
    for (var y = 0; y < 9; y++) {
      var td = document.createElement('td')
      var cell = createCell(x, y)
      td.appendChild(cell)
      tr.appendChild(td)
    }
    table.appendChild(tr)
  }
  return table
}

createCell = function(x, y) {
  var cell = document.createElement('div')
  cell.setAttribute('id', 'cell' + x + '' + y)
  cell.classList.add('cell')
  var table = document.createElement('table')
  cell.appendChild(table)
  var counter = 1
  for (var x = 0; x < 3; x++) {
    var tr = document.createElement('tr')
    for (var y = 0; y < 3; y++) {
      var td = document.createElement('td')
      var miniCell = document.createElement('div')
      miniCell.textContent = counter
      counter++
      td.appendChild(miniCell)
      tr.appendChild(td)
    }
    table.appendChild(tr)
  }
  return cell
}

