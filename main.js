console.log('js connected');

var $boardContainer = $('<div>').addClass('board-container');
$('main').append($boardContainer);

var board = {};
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
    var $row = $('<div>').addClass('row ' + i);
    for (k = 0; k < 7; k++) {
      var $cell = $('<div>').addClass('cell');
      $row.append($cell);
    }
    $boardContainer.append($row);
  }
  $('.0').addClass('header');
  startGame();
  eventListeners();
}

makeBoard();

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
var cellId;

function drop() {
  // dropping disk from the first row to the last available cell in the column
  cell.id = cell.id - -7;
  if ($('#' + cell.id).attr('id') == cell.id) {
    // making sure it will only check cells that exist on the board
    if (
      $('#' + cell.id).attr('class') != 'cell red' &&
      $('#' + cell.id).attr('class') != 'cell blue'
    ) {
      $('#' + cell.id).removeClass(currentPlayer.color);
      drop();
    } else {
      cell.id = cell.id - 7;
      $('#' + cell.id).addClass(currentPlayer.color);
      currentPlayer.moves.push(cell.id);
      checkWin();
      if (playerTwo.moves.length === 21) {
        setTimeout(alert('DRAW!'), 150);
      }
    }
  } else {
    cell.id = cell.id - 7;
    $('#' + cell.id).addClass(currentPlayer.color);
    currentPlayer.moves.push(cell.id);
    checkWin();
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
  currentPlayer = currentPlayer.color === 'red' ? playerTwo : playerOne;
  $('#banner')
    .text(currentPlayer.color.toUpperCase() + ' GOES NEXT')
    .css('color', currentPlayer.color);
}

$('h1').append(
  $('<div>')
    .attr('id', 'banner')
    .text(currentPlayer.color.toUpperCase() + ' GOES FIRST')
);

$('main').append(
  // 'play again' button
  $('<div>')
    .attr('id', 'startOver')
    .text('Play Again!')
    .click(startGame)
);

var rows = [];
// getting all rows to check for win later
var row = [];
for (var i = 0; i < $('.cell').length; i += 7) {
  row = [];
  for (var j = i; j < i + 7; j++) {
    row.push($('.cell').eq(j));
  }
  rows.push(row);
}

var cols = [];
// getting all columns to check for win later
var col = [];
for (var i = 0; i < 7; i++) {
  col = [];
  for (var j = i; j < $('.cell').length; j += 7) {
    col.push($('.cell').eq(j));
  }
  cols.push(col);
}

var diagsL = [];
// getting left diagonals
var diagLeft = [];
for (var i = 0; i < 2; i++) {
  diagLeft = [];
  for (var j = i; j < $('.cell').length; j += 8) {
    diagLeft.push($('.cell').eq(j));
  }
  diagsL.push(diagLeft);
}
for (var i = 2; i < 4; i++) {
  diagLeft = [];
  for (var j = i; j < 35; j += 8) {
    diagLeft.push($('.cell').eq(j));
  }
  diagsL.push(diagLeft);
}
for (var i = 7; i < 22; i += 7) {
  diagLeft = [];
  for (var j = i; j < $('.cell').length; j += 8) {
    diagLeft.push($('.cell').eq(j));
  }
  diagsL.push(diagLeft);
}

var diagsR = [];
// getting right diagonals
var diagRight = [];
for (var i = 6; i < 43; i += 6) {
  diagRight.push($('.cell').eq(i));
}
diagsR.push(diagRight);
var diagRight = [];
for (var i = 5; i < 36; i += 6) {
  diagRight.push($('.cell').eq(i));
}
diagsR.push(diagRight);
var diagRight = [];
for (var i = 4; i < 29; i += 6) {
  diagRight.push($('.cell').eq(i));
}
diagsR.push(diagRight);
var diagRight = [];
for (var i = 3; i < 22; i += 6) {
  diagRight.push($('.cell').eq(i));
}
diagsR.push(diagRight);
var diagRight = [];
for (var i = 13; i < 28; i += 7) {
  diagRight = [];
  for (var j = i; j < $('.cell').length; j += 6) {
    diagRight.push($('.cell').eq(j));
  }
  diagsR.push(diagRight);
}

function winner() {
  // announcing a winner
  var color = currentPlayer.color;
  setTimeout(function() {
    alert(color.toUpperCase() + ' WINS!!!');
  }, 150);
}

var winLine = [];

function checkWin() {
  // checking for the win
  for (var i = 0; i < rows.length; i++) {
    // first chrcking every row
    winLine = [];
    for (var j = 0; j < rows[i].length; j++) {
      if (rows[i][j].attr('class') === 'cell ' + currentPlayer.color) {
        winLine.push(rows[i][j].attr('id'));
        // if cells in the row contain certain color class push id of those cells in winLine
        if (winLine.length > 3) {
          winLine = winLine.sort(function(a, b) {
            return b - a;
          });
          // if winLine is longer than 3 sort the id from bigger to smaller
          winLine = winLine.map(function(el, indx, arr) {
            return el - arr[indx + 1];
          });
          // subtract every next id from previous id and returrn a new array
          // consisting only from subtraction results
          if (winLine.join('').includes(111)) {
            // if joined substruction results contain (111) - there is a winning line
            winner();
          }
        }
      }
    }
  }
  for (var i = 0; i < cols.length; i++) {
    // next checking columns the same way as rows
    // but instead of (111) looking for (777) combination in subtraction results
    winLine = [];
    for (var j = 0; j < cols[i].length; j++) {
      if (cols[i][j].attr('class') === 'cell ' + currentPlayer.color) {
        winLine.push(cols[i][j].attr('id'));
        if (winLine.length > 3) {
          winLine = winLine.sort(function(a, b) {
            return b - a;
          });
          winLine = winLine.map(function(el, indx, arr) {
            return el - arr[indx + 1];
          });
          if (winLine.join('').includes(777)) {
            winner();
          }
        }
      }
    }
  }
  for (var i = 0; i < diagsL.length; i++) {
    // next checking left diagonals
    // looking for (888) combination in subtraction results
    winLine = [];
    for (var j = 0; j < diagsL[i].length; j++) {
      if (diagsL[i][j].attr('class') === 'cell ' + currentPlayer.color) {
        winLine.push(diagsL[i][j].attr('id'));
        if (winLine.length > 3) {
          winLine = winLine.sort(function(a, b) {
            return b - a;
          });
          winLine = winLine.map(function(el, indx, arr) {
            return el - arr[indx + 1];
          });
          if (winLine.join('').includes(888)) {
            winner();
          }
        }
      }
    }
  }
  for (var i = 0; i < diagsR.length; i++) {
    // next checking right diagonals
    // looking for (666) - devil's number because this is a hell of a function
    winLine = [];
    for (var j = 0; j < diagsL[i].length; j++) {
      if (diagsR[i][j].attr('class') === 'cell ' + currentPlayer.color) {
        winLine.push(diagsR[i][j].attr('id'));
        if (winLine.length > 3) {
          winLine = winLine.sort(function(a, b) {
            return b - a;
          });
          winLine = winLine.map(function(el, indx, arr) {
            return el - arr[indx + 1];
          });
          if (winLine.join('').includes(666)) {
            winner();
          }
        }
      }
    }
  }
}
