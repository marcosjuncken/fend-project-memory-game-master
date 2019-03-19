/*
 * Create a list that holds all of your cards
 */
var cards;
cards = $('.card');
cardsIcons = [
    "fa fa-free-code-camp",
    "fa fa-free-code-camp",
    "fa fa-github",
    "fa fa-github",
    "fa fa-git",
    "fa fa-git",
    "fa fa-stack-overflow",
    "fa fa-stack-overflow",
    "fa fa-terminal",
    "fa fa-terminal",
    "fa fa-laptop",
    "fa fa-laptop",
    "fa fa-code",
    "fa fa-code",
    "fa fa-coffee",
    "fa fa-coffee"
];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    };
    return array;
};

function replacingCards() {
    counter = 0;
    sec = 0;
    min = 0;
    $('.stars').children().children()[0].className = 'fa fa-star';
    $('.stars').children().children()[1].className = 'fa fa-star';
    $('.stars').children().children()[2].className = 'fa fa-star';
    $('.moves')[0].innerHTML = counter;
    var newCards = shuffle(cardsIcons);
    for (i = 0, len = newCards.length; i < len; i++) { 
        $('.card').children()[i].className = newCards[i];
        $('.card')[i].className = 'card';
      };
    return newCards
};
replacingCards();

var openedCards = [];

var counter = 0;

var matchedCards = 0;

function congrats() {
    $('#congrats-modal').modal('show');
    if (min === 0) {
        $('.modal-body')[0].innerHTML = 'Você realizou ' + counter + ' movimentos em ' + sec + ' segundo(s). Você pontuou ' + $('.fa-star').length + ' estrela(s) de 3.' 
    }
    else {
        $('.modal-body')[0].innerHTML = 'Você realizou ' + counter + ' movimentos em ' + min + ' minuto(s) e ' + sec + ' segundo(s). Você pontuou ' + $('.fa-star').length + ' estrela(s) de 3.' 
    };
};

function newMove() {
    counter += 1;
    $('.moves')[0].innerHTML = counter;
    if (counter > 15) {
        $('.stars').children().children()[2].className = 'fa fa-star-o';
    };
    if (counter > 20) {
        $('.stars').children().children()[1].className = 'fa fa-star-o';
    };
    if (counter > 25) {
        $('.stars').children().children()[0].className = 'fa fa-star-o';
    };
};

function matchCards(card1, card2) {
    card1.removeClass('open show').addClass('match animated bounce');
    card2.removeClass('open show').addClass('match animated bounce');
    openedCards = [];
    matchedCards += 1;
    if (matchedCards === 8) {
        congrats();
    }
}

function unmatchCards(card1, card2) {
    card1.addClass('animated swing unmatch');
    card2.addClass('animated swing unmatch');
    setTimeout(function () {card1.removeClass('open show animated swing unmatch'); card2.removeClass('open show animated swing unmatch'); }, 900);
    openedCards = [];
}

function flipCard(card) {
    if (card.hasClass('match') === false) {
        card.addClass('open show animated flipInX');
        setTimeout(function () {card.removeClass('animated flipInX'); }, 700);
    };
};

function addOpenCard(card) {
    openedCards.push(card);
    if (openedCards.length === 2) {
        newMove();
        if (openedCards[0].children()[0].outerHTML === openedCards[1].children()[0].outerHTML) {
            matchCards(openedCards[0],openedCards[1]);
        } 
        else {
            unmatchCards(openedCards[0],openedCards[1]);
        };
    };
};

cards.each(function() {
    $(this).click(function() {
        flipCard($(this));
        setTimeout(addOpenCard, 900, $(this));
})});

$('.restart').click(function() {
    replacingCards(cards);
})

$('#modal-restart').click(function() {
    replacingCards(cards);
    $('#congrats-modal').modal('hide')
})

var sec = 0;
var min = 0;
var handler = function() {
  if (++sec === 60) {
    sec = 0;
    if (++min === 60) min = 0;
  }
  document.getElementById("time").innerHTML = (min < 10 ? "0" + min : min) + ":" + (sec < 10 ? "0" + sec : sec);
};
setInterval(handler, 1000);
handler();


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
