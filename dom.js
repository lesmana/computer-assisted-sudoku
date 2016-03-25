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

updateHtml = function(sudoku) {
  var cells = sudoku.cells
  for (var i = 0; i < 81; i++) {
    var cell = cells[i]
    updateHtmlCell(cell)
  }
}

updateHtmlCell = function(cell) {
  var x = cell.x
  var y = cell.y
  var candidates = cell.candidates
  for (var i = 0; i < 9; i++) {
    var candidate = candidates[i]
    var htmlCandidate = document.getElementById('candidate' + x + '' + y + '' + (i + 1))
    if (candidate != 0) {
      htmlCandidate.classList.remove('isnotcandidate')
    } else {
      htmlCandidate.classList.add('isnotcandidate')
    }
  }
}

