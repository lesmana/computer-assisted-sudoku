Sudoku = function() {
  this.boxes = createBoxes()
  this.rows = createRows()
  this.columns = createColumns()
  this.cells = createCells(this.boxes, this.rows, this.columns)
}

Sudoku.prototype.getCandidates = function(cellIndex) {
  var cell = this.cells[cellIndex]
  var candidates = []
  for (var i = 0; i < 9; i++) {
    var maybeCandidate = cell.candidates[i]
    if (maybeCandidate != 0) {
      candidates.push(maybeCandidate)
    }
  }
  return candidates
}

Sudoku.prototype.setCandidate = function(cellIndex, candidate) {
  var cell = this.cells[cellIndex]
  for (var i = 0; i < 9; i++) {
    cell.candidates[i] = 0
  }
  cell.candidates[candidate - 1] = candidate
  for (var i = 0; i < 20; i++) {
    var neighbour = cell.neighbours[i]
    neighbour.candidates[candidate - 1] = 0
  }
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

