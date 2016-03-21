// wait for the DOM to finish loading
$(document).ready(function() {

// Reset button
  $("button").on("click", function resetGame() {
    $(".cell").text("");
  });

  var $cells = $('.cell');

  var player = "X";
  var onDeck = "O";

  function resetGame () {
    $cells.text("");
    $cells.removeClass("X");
    $cells.removeClass("O");
    player = "X";
  }

  function changePlayer() {
    if (player === "X") {
      player = "O";
      onDeck = "X";
    } else {
      player = "X";
      onDeck = "O";
    }
  }

  var xWins = 0;
  var oWins = 0;

  function incrementCounter(winner) {
    if (winner === "X") {
      xWins++;
      $("#xVictories").html(xWins);
    } else if (winner === "O") {
      oWins++;
      $("#oVictories").html(oWins);
    }
  }


// Winner checkers

  function whoWon($cellOne, $cellTwo, $cellThree) {
    var cellOnePlayer = ($cellOne).text(),
    cellTwoPlayer = ($cellTwo).text(),
    cellThreePlayer = ($cellThree).text();

    if ((cellOnePlayer === cellTwoPlayer) && (cellTwoPlayer === cellThreePlayer)){
      if (cellOnePlayer === "X") {
        return "X";
      } else if (cellOnePlayer === "O") {
        return "O";
      }
    }
    return null;
  }

  function columnWin() {
    var left = whoWon($cells.eq(0), $cells.eq(3), $cells.eq(6));
    var mid = whoWon($cells.eq(1), $cells.eq(4), $cells.eq(7));
    var right = whoWon($cells.eq(2), $cells.eq(5), $cells.eq(8));
    return (left || mid || right);
  }

  function rowWin() {
    var top = whoWon($cells.eq(0), $cells.eq(1), $cells.eq(2));
    var mid = whoWon($cells.eq(3), $cells.eq(4), $cells.eq(5));
    var bottom = whoWon($cells.eq(6), $cells.eq(7), $cells.eq(8));
    return (top || mid || bottom);
  }

  function diagonalWin() {
    var leftUpDiagonal = whoWon($cells.eq(6), $cells.eq(4), $cells.eq(2));
    var leftDownDiagonal = whoWon($cells.eq(0), $cells.eq(4), $cells.eq(8));
    return (leftDownDiagonal || leftUpDiagonal);
  }

  function checkForWin() {
    return columnWin() || rowWin() || diagonalWin();
  }

  function isFull() {
    var someEmptyCells = false;
    for (var i=0; i<9; i++) {
      if ($cells.eq(i).text() === "") {
        someEmptyCells = true;
      }
    }
    return someEmptyCells;
  }

//Executed when clicked
  $cells.on("click", function handleClick() {
  //Only add an X or O if there is text in the cell
    if ($(this).text() === "") {
      //Add an X or O depending on who is currently player
      if (player === "X") {
        $(this).text(player).css("color", "#41BAB4");
      } else if (player === "O") {
        $(this).text(player).css("color", "#BA4147");
      }

// check for winner
      var winner = checkForWin();
      if (winner) {
        alert("Player " + winner + " won!");
        $(".cell").text("");
        incrementCounter(winner);
        resetGame();
      } else if (isFull()) {
        $("#changeMe").text(onDeck);
        changePlayer();
      } else {
        alert("Cat's game! Nobody won.");
        resetGame();
      }
    }
  });

});
