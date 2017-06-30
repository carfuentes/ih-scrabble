var board=[
["TW", "n", "n", "n", "n", "n", "n", "n","n", "n", "n", "n","n", "n", "n"],
["n", "n", "n", "n", "n", "n", "n", "n","n", "n", "n", "n","n", "n", "n"],
["n", "n", "n", "n", "n", "n", "n", "n","n", "n", "n", "n","n", "n", "n"],
["n", "n", "n", "n", "n", "n", "n", "n","n", "n", "n", "n","n", "n", "n"],
["n", "n", "n", "n", "n", "n", "n", "n","n", "n", "n", "n","n", "n", "n"],
["n", "n", "n", "n", "n", "n", "n", "n","n", "n", "n", "n","n", "n", "n"],
["n", "n", "n", "n", "n", "n", "n", "n","n", "n", "n", "n","n", "n", "n"],
["n", "n", "n", "n", "n", "n", "n", "n","n", "n", "n", "n","n", "n", "n"],
["n", "n", "n", "n", "n", "n", "n", "n","n", "n", "n", "n","n", "n", "n"],
["n", "n", "n", "n", "n", "n", "n", "n","n", "n", "n", "n","n", "n", "n"],
["n", "n", "n", "n", "n", "n", "n", "n","n", "n", "n", "n","n", "n", "n"],
["n", "n", "n", "n", "n", "n", "n", "n","n", "n", "n", "n","n", "n", "n"],
["n", "n", "n", "n", "n", "n", "n", "n","n", "n", "n", "n","n", "n", "n"],
["n", "n", "n", "n", "n", "n", "n", "n","n", "n", "n", "n","n", "n", "n"],
["n", "n", "n", "n", "n", "n", "n", "n","n", "n", "n", "n","n", "n", "n"],
];




//OBJETOS
//GAME
function Game(letters) {
this.abc=letters;
this.wordsInBoard=[];
this.tilesInBoard=0;
this.generateBoard= function() {
  for (var row = 0; row < 15; row++) {
    for (var col = 0; col < 15; col++) {
      $('.board').append($('<div>')
        .addClass('cell')
        .attr('data-row', row)
        .attr('data-col', col)
        .attr('multiplier', board[row][col])
        //SWITCH


      );
    }
  }

  $('.cell').droppable ({
    accept:".tile",
    drop: handleDrop
  });
};

this.generateTiles= function () {
  for (var row = 0; row < 7; row++) {
      var randomLetter= this.abc.getRandomItem();
      $('.tiles').append($('<div>').addClass('tile').text(randomLetter.id)
                    .append($('<span>').addClass('point').text(randomLetter.points)));
      $('.tile').draggable( {
                      //helper:"clone",
                      cursor: 'move',
                      containment: 'document',
                      snap:"cell",
                      revert: true,
                      appendTo:'cell',
                      drag: handleDrag
                    } );

    }
};


}

Game.prototype.clearTiles = function() {
  $('.tiles').html("");
};

Game.prototype.counTiles=function() {
  return $(".letter-fixed").length;

};

Game.prototype.getPoints= function(stringWord) {
  var that=this;
  var totalPoints=0;
  stringWord.toUpperCase().split("").forEach(function(el) {
    totalPoints+= that.abc.letters.filter(function(letterObj)
    {return letterObj.id===el;})[0].points;
  });
  return totalPoints;};


//LETTERS
function Letters() {
  this.letters= [
  { id: 'Z', points: 10, weight: 1 },
  { id: 'X', points: 8, weight: 1 },
  { id: 'J', points: 8, weight: 1 },
  { id: 'K', points: 5, weight: 1 },
  { id: 'Q', points: 10, weight: 1 },
  { id: ' ', points: 0, weight: 2 },
  { id: 'F', points: 4, weight: 2 },
  { id: 'W', points: 4, weight: 2 },
  { id: 'H', points: 4, weight: 2 },
  { id: 'V', points: 4, weight: 2 },
  { id: 'B', points: 3, weight: 2 },
  { id: 'C', points: 3, weight: 2 },
  { id: 'Y', points: 4, weight: 2 },
  { id: 'P', points: 3, weight: 2 },
  { id: 'M', points: 3, weight: 2 },
  { id: 'G', points: 2, weight: 3 },
  { id: 'D', points: 2, weight: 4 },
  { id: 'L', points: 1, weight: 4 },
  { id: 'S', points: 1, weight: 4 },
  { id: 'U', points: 1, weight: 4 },
  { id: 'R', points: 1, weight: 6 },
  { id: 'N', points: 1, weight: 6 },
  { id: 'T', points: 1, weight: 6 },
  { id: 'O', points: 1, weight: 8 },
  { id: 'I', points: 1, weight: 9 },
  { id: 'A', points: 1, weight: 9 },
  { id: 'E', points: 1, weight: 12 }
];

  this.getTotalWeights= function() {
    var totalWeight=0;
    this.letters.forEach(function(letter) {
      totalWeight += letter.weight;
    });
    return totalWeight;

};

this.getWeights=function() {
  var weights=[];
  this.letters.forEach(function(letter) {
    weights.push(letter.weight);
  });
  return weights;
};


this.getRandomItem = function() {
    var weights=this.getWeights();
    var weight_sum=0;
    var random_num = Math.floor(Math.random() * this.getTotalWeights());
    for (var i = 0; i < this.letters.length; i++) {
        weight_sum += weights[i];
        if (random_num <= weight_sum) {
            return this.letters[i];
        }
    }


};

}

function Word() {
  this.position=[];

  this.getWordInTheBoard= function(letterCell) {
    var eachLetter= {
                    row: parseInt(letterCell.attr("data-row")),
                    col:parseInt(letterCell.attr("data-col")),
                    letter: letterCell.text().replace(/[0-9]/g,""),
                    multiplier:letterCell.attr("multiplier")
                  };
    this.position.push(eachLetter);
};


  this.getWholeWord= function() {
    var wholeWord=[];
    this.position.forEach(function(el) {
      wholeWord.push(el.letter);
    });
    return wholeWord.join("").toLowerCase();
  };

  this.isWordInDict= function() {
    var word=this.getWholeWord();
    var wordInDict= allWords.find(function(element){
      return element === word;
    });
    return wordInDict;
  };

  this.addWordToTheBoard=function() {
      game.wordsInBoard.push({word:word.getWholeWord(),coord:this.position});
      this.position.forEach(function(el){
          $("[data-row="+el.row+"][data-col="+el.col+"]").addClass('letter-fixed');
          //$("[data-row="+el.row+"][data-col="+el.col+"]").children().appendTo('.tiles').addClass("tile");

    });
  };

  this.removeOftheBoard=function () {
    this.position.forEach(function(el){
        if(!$("[data-row="+el.row+"][data-col="+el.col+"]").hasClass('letter-fixed')) {
            clearWrongTile(el.row,el.col);

          if(game.wordsInBoard.length===0) {
            $(".cell").droppable("option", "disabled", false );
          }
          //ARREGLAR ESTE PROBLEMA.

        }
      });
  };




  }

Word.prototype.getSortedByCol = function() {
  this.position.sort(function(a,b) {
    return a.row - b.row;
  });
};

Word.prototype.getSortedByRow = function() {
  this.position.sort(function(a,b) {
    return a.col - b.col;
  });
};




function Player (name,turn,selector) {
  this.selector=selector;
  this.turn=turn;
  this.name=name;
  this.points=0;
  this.words=[];
}



//FUNCIONES Y VARIABLES
function clearWrongTile(row,col){
  $("[data-row="+row+"][data-col="+col+"]").removeClass("letter-in-board");
  $("[data-row="+row+"][data-col="+col+"]").children().appendTo('.tiles').addClass("tile");
  $("[data-row="+row+"][data-col="+col+"]").empty();
  $("[data-row="+row+"][data-col="+col+"]").droppable("option", "disabled", false );
}

function reactivateCell (row,col) {
    $("[data-row="+row+"][data-col="+col+"]").droppable("option", "disabled", false );
}

function justMyAdjDroppable(row,col) {
  reactivateCell(row,col-1);
  reactivateCell(row, col+1);
  reactivateCell(row-1,col);
  reactivateCell(row+1,col);

}


function justMyRowDroppable(row, col) {
  word.getSortedByRow();
  var firstLetterRow=word.position[0].col-1;
  var lastLetterRow=word.position[word.position.length-1].col+1;
  reactivateCell(row,firstLetterRow);
  reactivateCell(row,lastLetterRow);



}

function justMyColDroppable(row,col) {
  word.getSortedByCol();
  var firstLetterCol=word.position[0].row-1;
  var lastLetterCol=word.position[word.position.length-1].row+1;
  reactivateCell(firstLetterCol,col);
  reactivateCell(lastLetterCol,col);

}

function adaptDraggable(dragObj) {
  dragObj.removeClass("tile");
  dragObj.children().removeClass("point");
}

function adaptDroppeable(dropObj,dragObj) {
  dropObj.droppable("option", "disabled", true );
  dropObj.html(dragObj.get());
  dropObj.addClass('letter-in-board');
  dropObj.children().children().addClass('point-in-board');

}

function myFirstLetter(dropObj) {
  $(".cell").droppable("option", "disabled", true );
  if (word.position.length==1) {
    justMyAdjDroppable(word.position[0].row,
                        word.position[0].col);
  } else {
     if (word.position[0].row === word.position[1].row) {
       justMyRowDroppable(dropObj.attr("data-row"), dropObj.attr("data-col"));
    } else if (word.position[0].col === word.position[1].col){
      justMyColDroppable(dropObj.attr("data-row"), dropObj.attr("data-col"));
    }
  }
}

function justAdjToMyWords() {
      game.wordsInBoard.forEach(function(myWord){
        myWord.coord.forEach(function(letter) {
          justMyAdjDroppable(letter.row,
                           letter.col);
                             });

      });

}

function intersectWords (dropObj) {
  var myLastItemRow=parseInt(dropObj.attr("data-row"));
  var myLastItemCol=parseInt(dropObj.attr("data-col"));
  console.log(dropObj);
  $(".cell").droppable("option", "disabled", true );

  game.wordsInBoard.forEach(function(myWord){
    myWord.coord.forEach(function(letter) {
      if (myLastItemRow === letter.row) {
        word.position.push(letter);
        justMyRowDroppable(myLastItemRow, myLastItemCol);

      } else if (myLastItemCol === letter.col) {
        word.position.push(letter);
        justMyColDroppable(myLastItemRow, myLastItemCol);
      }

    });
  });
  word.position=_.uniqWith(word.position, _.isEqual);
}

var game= new Game(new Letters());
var word=new Word();
function handleDrop(event,ui){

         adaptDraggable(ui.draggable);
         adaptDroppeable($(this), $(ui.draggable));


        word.getWordInTheBoard($(this));

         if(game.wordsInBoard.length===0) {
           myFirstLetter($(this));
       } else {
            intersectWords($(this));
       }

}

function handleDrag(event,ui){
   if(game.wordsInBoard.length>=1 && word.position.length===0) {
     justAdjToMyWords();
   } else {
   }
}

function changeBlock() {
  $(".player1 .start").toggleClass("block");
  $(".player1 .new").toggleClass("block");
  $(".player2 .start").toggleClass("block");
  $(".player2 .new").toggleClass("block");
}

function changeFade(player, enemy) {
  $(player).fadeTo(1,0.4);
  $(enemy).fadeTo(1,1);
}

function goodJob(player) {
  $(".p1 .sum-points").text(player.points);
  $(".background-darkener").fadeIn(1000);
  var intervalId= setTimeout(function () {
    $(".background-darkener").fadeOut(1000);
  }, 3000);

}

function tryAgain(counter) {
  if(counter===0) { changeBlock();}
  else {
  $(".count").text(counter);
  $(".background-darkener-try").fadeIn(1000);
  var intervalId= setTimeout(function () {
    $(".background-darkener-try").fadeOut(1000);
  }, 3000);
}

}

function win (player) {
  $(".background-darkener").empty();
  $(player.selector).appendTo($(".background-darkener"));
  $(player.selector).addClass('popup-p1');
  $(player.selector+" button").remove();
  $("<div class:\"win\">You win!</div>").appendTo(player.selector);
  $("<button type=\"button\" class=\"btn btn-outline-info reload\">New game?</button>").appendTo(player.selector);
  $(".background-darkener").fadeOut();

}


function handleClick (player,enemy,counter) {
  if(word.isWordInDict()) {
    counter=3;
    changeBlock();
    changeFade(player.selector,enemy.selector);
    player.points+=game.getPoints(word.getWholeWord());
    $("."+player.name+" .sum-points").text(player.points);

    word.addWordToTheBoard();

    goodJob(player);

    word=new Word();
    game.clearTiles();
    game.generateTiles();

  } else {
    counter--;
    tryAgain(counter);
    word.removeOftheBoard();
    word=new Word();

  }


}
//LA CHICHA
//////////////////////////////


$(document).ready(function() {



game.generateBoard();
game.generateTiles();

var player1= new Player("player1",true,".player1");
var player2= new Player("player2",false,".player2");

$(".new").on("click",function(){
game.clearTiles();
game.generateTiles();

});



$(".player1 .start").on("click",function(){
    var counter=3;
    handleClick(player1,player2,counter);

  });



$(".player2 .start").on("click",function(){
      var counter=3;
      handleClick(player2,player1,counter);

});

$('.reload').click(function() {
    location.reload(true);
});


});
