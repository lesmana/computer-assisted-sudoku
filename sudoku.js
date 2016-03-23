window.onload = function() {
  var sudokuDiv = document.getElementById('sudoku')
  var sudokuGrid = createHtmlGrid()
  sudokuDiv.replaceChild(sudokuGrid, sudokuDiv.firstChild)
  sudokuData = createSudoku()
  fillSudoku(sudokuData)
  updateHtml(sudokuData)
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

createSudoku = function() {
  var boxes = createBoxes()
  var rows = createRows()
  var columns = createColumns()
  var cells = createCells(boxes, rows, columns)
  var sudoku = new Object()
  sudoku.boxes = boxes
  sudoku.rows = rows
  sudoku.columns = columns
  sudoku.cells = cells
  return sudoku
}

createBoxes = function() {
  var boxcolumns = []
  for (var x = 0; x < 3; x++) {
    var boxrows = []
    for (var y = 0; y < 3; y++) {
      var box = []
      boxrows[y + 1] = box
    }
    boxcolumns[x + 1] = boxrows
  }
  return boxcolumns
}

createRows = function() {
  var rows = []
  for (var i = 0; i < 9; i++) {
    var row = []
    rows[i + 1] = row
  }
  return rows
}

createColumns = function() {
  var columns = []
  for (var i = 0; i < 9; i++) {
    var column = []
    columns[i + 1] = column
  }
  return columns
}

createCells = function(boxes, rows, columns) {
  var cells = []
  for (var x = 0; x < 9; x++) {
    for (var y = 0; y < 9; y++) {
      var cell = createCell(x + 1, y + 1)
      var bx = Math.floor(x / 3) + 1
      var by = Math.floor(y / 3) + 1
      boxes[bx][by].push(cell)
      rows[y + 1][x + 1] = cell
      columns[x + 1][y + 1] = cell
      cell.box = boxes[bx][by]
      cell.row = rows[y + 1]
      cell.column = columns[x + 1]
      cells.push(cell)
    }
  }
  setNeighbours(cells)
  return cells
}

setNeighbours = function(cells) {
  for (var i = 0; i < 81; i++) {
    var cell = cells[i]
    var neighbours = new Set()
    for (var b = 0; b < 9; b++) {
      var bcell = cell.box[b]
      neighbours.add(bcell)
    }
    for (var r = 0; r < 9; r++) {
      var rcell = cell.row[r + 1]
      neighbours.add(rcell)
    }
    for (var c = 0; c < 9; c++) {
      var ccell = cell.column[c + 1]
      neighbours.add(ccell)
    }
    neighbours.delete(cell)
    var neighboursarray = Array.from(neighbours)
    cell.neighbours = neighboursarray
  }
}

createCell = function(cx, cy) {
  var cell = new Object()
  cell.x = cx
  cell.y = cy
  cell.candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  return cell
}

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
  var index = Math.floor(Math.random() * candidates.length)
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

// hopefully correctly implemented fisher-yates shuffle
// https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
shuffle = function(array) {
  let counter = array.length;
  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
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
