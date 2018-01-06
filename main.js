console.log('js connected');

var $boardContainer = $('<div>').addClass('board-container');
$('main').append($boardContainer);

var board = {
  rows: [],
  cols: [],
  diagsL: [],
  diagsR: [],
  getRows: getRows,
  getCols: getCols,
  getDiagsL: getDiagsL,
  getDiagsR: getDiagsR,
  checkRows: checkRows,
  checkCols: checkCols,
  checkDiagsL: checkDiagsL,
  checkDiagsR: checkDiagsR,
  winLine: [],
  checkWin: checkWin,
};

var app = {
  makeBoard: makeBoard,
  startGame: startGame,
  eventListeners: eventListeners,
};

var playerOne = {
  color: 'red',
  moves: [],
};

var playerTwo = {
  color: 'blue',
  moves: [],
};

var currentPlayer;

function makeBoard() {
  // creating game board
  for (var i = 0; i < 7; i++) {
    var $row = $('<div>').addClass(`row ${i}`);
    for (var j = 0; j < 7; j++) {
      var $cell = $('<div>').addClass('cell');
      $row.append($cell);
    }
    $boardContainer.append($row);
    $('.0').addClass('header');
  }
}

app.makeBoard();
app.eventListeners();
app.startGame();

for (var i = 0; i < $('.cell').length; i++) {
  // adding id to each cell
  $('.cell')
    .eq(i)
    .attr('id', i);
}

function eventListeners() {
  // adding event listeners to cells of the first row of the board
  for (var i = 0; i < $('.row')[0].children.length; i++) {
    $('.cell')
      .eq(i)
      .on('mouseover', function(e) {
        $(e.target).addClass(currentPlayer.color);
      });
    $('.cell')
      .eq(i)
      .on('mouseleave', function(e) {
        $(e.target).removeClass(currentPlayer.color);
      });
    $('.cell')
      .eq(i)
      .on('click', move);
  }
}

function startGame() {
  // function to start and restart game
  playerOne.moves = [];
  playerTwo.moves = [];
  currentPlayer = playerOne;
  $('#winnerBanner').css('opacity', '0');
  for (var i = 0; i < $('.cell').length; i++) {
    $('.cell')
      .eq(i)
      .removeClass('red');
    $('.cell')
      .eq(i)
      .removeClass('blue');
  }
  $('.cell')
    .eq(3)
    .addClass('red')
    .on('mouseover', function(e) {
      $(e.target).off(e.type, arguments.callee);
    });
}

var cell;

function drop() {
  // dropping disk from the first row to the last available cell in the column
  cell.id = cell.id - -7;
  if ($('#' + cell.id).attr('id') == cell.id) {
    // making sure it will only check cells that exist on the board
    if (
      $('#' + cell.id).attr('class') != 'cell red' &&
      $('#' + cell.id).attr('class') != 'cell blue'
    ) {
      $('#' + cell.id).addClass(currentPlayer.color);
      setTimeout(function() {
        $('#' + cell.id).removeClass(currentPlayer.color);
      }, 40);
      setTimeout(function() {
        drop();
      }, 40);
    } else {
      cell.id = cell.id - 7;
      $('#' + cell.id).addClass(currentPlayer.color);
      currentPlayer.moves.push(cell.id);
      board.checkWin();
      currentPlayer = currentPlayer.color === 'red' ? playerTwo : playerOne;
      $('#banner')
        .text(`${currentPlayer.color.toUpperCase()} GOES NEXT`)
        .css('color', currentPlayer.color);
      if (playerTwo.moves.length === 21) {
        $('#winnerBanner')
          .text('DRAW!')
          .css('opacity', '1');
      }
    }
  } else {
    cell.id = cell.id - 7;
    $('#' + cell.id).addClass(currentPlayer.color);
    currentPlayer.moves.push(cell.id);
    board.checkWin();
    currentPlayer = currentPlayer.color === 'red' ? playerTwo : playerOne;
    $('#banner')
      .text(`${currentPlayer.color.toUpperCase()} GOES NEXT`)
      .css('color', currentPlayer.color);
  }
}

function move(e) {
  // removing disk from the first row before the drop and toggling players and updating banner
  $(e.target).removeClass(currentPlayer.color);
  cell = {
    id: $(e.target).attr('id'),
    drop: drop,
  };
  cell.drop();
}

$('h1').append(
  $('<div>')
    .attr('id', 'banner')
    .text(`${currentPlayer.color.toUpperCase()} GOES FIRST`)
);

$('main').append(
  // 'play again' button
  $('<div>')
    .attr('id', 'startOver')
    .text('Play Again!')
    .click(startGame)
);

function getRows() {
  // getting all rows to check for win later
  var row = [];
  for (var i = 0; i < $('.cell').length; i += 7) {
    row = [];
    for (var j = i; j < i + 7; j++) {
      row.push($('.cell').eq(j));
    }
    this.rows.push(row);
  }
}

function getCols() {
  // getting all columns to check for win later
  var col = [];
  for (var i = 0; i < 7; i++) {
    col = [];
    for (var j = i; j < $('.cell').length; j += 7) {
      col.push($('.cell').eq(j));
    }
    this.cols.push(col);
  }
}

function getDiagsL() {
  // getting left diagonals
  var diagLeft = [];
  for (var i = 0; i < 2; i++) {
    diagLeft = [];
    for (var j = i; j < $('.cell').length; j += 8) {
      diagLeft.push($('.cell').eq(j));
    }
    this.diagsL.push(diagLeft);
  }
  for (var i = 2; i < 4; i++) {
    diagLeft = [];
    for (var j = i; j < 35; j += 8) {
      diagLeft.push($('.cell').eq(j));
    }
    this.diagsL.push(diagLeft);
  }
  for (var i = 7; i < 22; i += 7) {
    diagLeft = [];
    for (var j = i; j < $('.cell').length; j += 8) {
      diagLeft.push($('.cell').eq(j));
    }
    this.diagsL.push(diagLeft);
  }
}

function getDiagsR() {
  // getting right diagonals
  var diagRight = [];
  for (var i = 6; i < 43; i += 6) {
    diagRight.push($('.cell').eq(i));
  }
  this.diagsR.push(diagRight);
  var diagRight = [];
  for (var i = 5; i < 36; i += 6) {
    diagRight.push($('.cell').eq(i));
  }
  this.diagsR.push(diagRight);
  var diagRight = [];
  for (var i = 4; i < 29; i += 6) {
    diagRight.push($('.cell').eq(i));
  }
  this.diagsR.push(diagRight);
  var diagRight = [];
  for (var i = 3; i < 22; i += 6) {
    diagRight.push($('.cell').eq(i));
  }
  this.diagsR.push(diagRight);
  var diagRight = [];
  for (var i = 13; i < 28; i += 7) {
    diagRight = [];
    for (var j = i; j < $('.cell').length; j += 6) {
      diagRight.push($('.cell').eq(j));
    }
    this.diagsR.push(diagRight);
  }
}

board.getRows();
board.getCols();
board.getDiagsL();
board.getDiagsR();

$('body').append(
  // winner banner
  $('<div>').attr('id', 'winnerBanner')
);

function winner() {
  // announcing a winner
  var color = currentPlayer.color;
  $('#winnerBanner')
    .text(`${color.toUpperCase()} WINS!!!`)
    .css('opacity', '1');
}

function checkRows() {
  for (var i = 0; i < this.rows.length; i++) {
    // first chrcking every row
    this.winLine = [];
    for (var j = 0; j < this.rows[i].length; j++) {
      if (this.rows[i][j].attr('class') === 'cell ' + currentPlayer.color) {
        this.winLine.push(this.rows[i][j].attr('id'));
        // if cells in the row contain certain color class push id of those cells in winLine
        if (this.winLine.length > 3) {
          this.winLine = this.winLine.sort(function(a, b) {
            return b - a;
          });
          // if winLine is longer than 3 sort the id from bigger to smaller
          this.winLine = this.winLine.map(function(el, indx, arr) {
            return el - arr[indx + 1];
          });
          // subtract every next id from previous id and returrn a new array
          // consisting only from subtraction results
          if (this.winLine.join('').includes(111)) {
            // if joined substruction results contain (111) - there is a winning line
            winner();
          }
        }
      }
    }
  }
}

function checkCols() {
  for (var i = 0; i < this.cols.length; i++) {
    // next checking columns the same way as rows
    // but instead of (111) looking for (777) combination in subtraction results
    this.winLine = [];
    for (var j = 0; j < this.cols[i].length; j++) {
      if (this.cols[i][j].attr('class') === 'cell ' + currentPlayer.color) {
        this.winLine.push(this.cols[i][j].attr('id'));
        if (this.winLine.length > 3) {
          this.winLine = this.winLine.sort(function(a, b) {
            return b - a;
          });
          this.winLine = this.winLine.map(function(el, indx, arr) {
            return el - arr[indx + 1];
          });
          if (this.winLine.join('').includes(777)) {
            winner();
          }
        }
      }
    }
  }
}

function checkDiagsL() {
  for (var i = 0; i < this.diagsL.length; i++) {
    // next checking left diagonals
    // looking for (888) combination in subtraction results
    this.winLine = [];
    for (var j = 0; j < this.diagsL[i].length; j++) {
      if (this.diagsL[i][j].attr('class') === 'cell ' + currentPlayer.color) {
        this.winLine.push(this.diagsL[i][j].attr('id'));
        if (this.winLine.length > 3) {
          this.winLine = this.winLine.sort(function(a, b) {
            return b - a;
          });
          this.winLine = this.winLine.map(function(el, indx, arr) {
            return el - arr[indx + 1];
          });
          if (this.winLine.join('').includes(888)) {
            winner();
          }
        }
      }
    }
  }
}

function checkDiagsR() {
  for (var i = 0; i < this.diagsR.length; i++) {
    // next checking right diagonals
    // looking for (666)
    this.winLine = [];
    for (var j = 0; j < this.diagsR[i].length; j++) {
      if (this.diagsR[i][j].attr('class') === 'cell ' + currentPlayer.color) {
        this.winLine.push(this.diagsR[i][j].attr('id'));
        if (this.winLine.length > 3) {
          this.winLine = this.winLine.sort(function(a, b) {
            return b - a;
          });
          this.winLine = this.winLine.map(function(el, indx, arr) {
            return el - arr[indx + 1];
          });
          if (this.winLine.join('').includes(666)) {
            winner();
          }
        }
      }
    }
  }
}

function checkWin() {
  // checking for the win
  this.checkRows();
  this.checkCols();
  this.checkDiagsL();
  this.checkDiagsR();
}
