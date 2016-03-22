window.onload = function() {
  var sudokuDiv = document.getElementById('sudoku')
  var sudokuGrid = createHtmlGrid()
  sudokuDiv.replaceChild(sudokuGrid, sudokuDiv.firstChild)
}

createHtmlGrid = function() {
  var table = document.createElement('table')
  for (var x = 0; x < 3; x++) {
    var tr = document.createElement('tr')
    for (var y = 0; y < 3; y++) {
      var td = document.createElement('td')
      var box = createHtmlBox(x, y)
      td.appendChild(box)
      tr.appendChild(td)
    }
    table.appendChild(tr)
  }
  return table
}

createHtmlBox = function(bx, by) {
  var table = document.createElement('table')
  for (var x = 0; x < 3; x++) {
    var tr = document.createElement('tr')
    for (var y = 0; y < 3; y++) {
      var td = document.createElement('td')
      var cell = createHtmlCell((bx * 3) + x, (by * 3) + y)
      td.appendChild(cell)
      tr.appendChild(td)
    }
    table.appendChild(tr)
  }
  return table
}

createHtmlCell = function(cx, cy) {
  var cell = document.createElement('div')
  cell.setAttribute('id', 'cell' + (cx + 1) + '' + (cy + 1))
  cell.classList.add('cell')
  var table = document.createElement('table')
  cell.appendChild(table)
  var counter = 1
  for (var x = 0; x < 3; x++) {
    var tr = document.createElement('tr')
    for (var y = 0; y < 3; y++) {
      var td = document.createElement('td')
      var candidate = document.createElement('div')
      candidate.setAttribute('id', 'candidate' + (cx + 1) + '' + (cy + 1) + '' + counter)
      candidate.textContent = counter
      counter++
      td.appendChild(candidate)
      tr.appendChild(td)
    }
    table.appendChild(tr)
  }
  return cell
}

