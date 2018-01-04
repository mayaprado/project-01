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
  $('.cell')
    .eq(i)
    .attr('id', i);
}

function eventListeners() {
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
      .click(function(e) {
        move(e);
      });
  }
}

function startGame() {
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
var newId;

function drop() {
  cell.id = cell.id - -7;
  if ($('#' + cell.id).attr('id') == cell.id) {
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
    }
  } else {
    cell.id = cell.id - 7;
    $('#' + cell.id).addClass(currentPlayer.color);
    currentPlayer.moves.push(cell.id);
  }
}

function move(e) {
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
  $('<div>')
    .attr('id', 'startOver')
    .text('Play Again!')
    .click(startGame)
);
