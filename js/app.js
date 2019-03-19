// This is the list that hold all of my cards
var cards = $('.card');

// This is the array that hold all of my cards icons to shuffle
var cardsIcons = [
    "fa fa-free-code-camp",
    "fa fa-github",
    "fa fa-git",
    "fa fa-stack-overflow",
    "fa fa-terminal",
    "fa fa-laptop",
    "fa fa-code",
    "fa fa-coffee"
];

// Duplicating all the icons to create the cards deck
var deck = cardsIcons.concat(cardsIcons)

// This is the array that hold all of my opened cards 
var openedCards = [];

// This is the movements counter, that begins with Zero
var counter = 0;

// This is the matched cards number, that begins with Zero
var matchedCards = 0;

// This is the timer seconds and minutes, that begins with Zero
var sec = 0;
var min = 0;

// Shuffle function from http://stackoverflow.com/a/2450976
// Shuffle all the card icons to a new match game
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    };
    return array;
};

/*
 * This function restart the game making 4 things: 
 *   - reset movements counter
 *   - reset timer
 *   - reset stars
 *   - create a new deck with shuffle function
 */
function replacingCards() {
    // reset counter
    counter = 0;
    // reset timer
    sec = 0;
    min = 0;
    // reset stars
    $('.stars').children().children()[0].className = 'fa fa-star';
    $('.stars').children().children()[1].className = 'fa fa-star';
    $('.stars').children().children()[2].className = 'fa fa-star';
    $('.moves')[0].innerHTML = counter;
    // create a new deck with shuffle function
    var newCards = shuffle(deck);
    for (i = 0, len = newCards.length; i < len; i++) {
        $('.card').children()[i].className = newCards[i];
        $('.card')[i].className = 'card';
    };
    return newCards
};

/*
 * When someone finish the game, this function:
 *   - open the congratulations modal
 *   - shows the timer, movements counter and stars.
 */
function congrats() {
    // open the congratulations modal
    $('#congrats-modal').modal('show');
    // shows the timer, movements counter and stars
    if (min === 0) {
        $('.modal-body')[0].innerHTML = 'Você realizou ' + counter + ' movimentos em ' + sec + ' segundo(s). Você pontuou ' + $('.fa-star').length + ' estrela(s) de 3.'
    } else {
        $('.modal-body')[0].innerHTML = 'Você realizou ' + counter + ' movimentos em ' + min + ' minuto(s) e ' + sec + ' segundo(s). Você pontuou ' + $('.fa-star').length + ' estrela(s) de 3.'
    };
};

/*
 * When someone makes a new move, this function:
 *   - add a movement on the counter and change the counter on the page
 *   - change the star to a empty stars depending the moves quantity
 */
function newMove() {
    // add a movement on the counter
    counter += 1;
    // change the counter on the page
    $('.moves')[0].innerHTML = counter;
    // change the star to a empty stars depending the moves quantity(+15, +20, +25)
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

/*
 * When someone match de cards, this function:
 *   - remove the classes that makes the card open and show
 *   - add the classes that the card match and an animation
 *   - reset the opened cards array
 *   - add 1 in the matched cards counter
 *   - execute the congrats function if matched all the cards   
 */
function matchCards(card1, card2) {
    // remove the classes that makes the card open and show
    //add the classes that the card match and an animation
    card1.removeClass('open show').addClass('match animated bounce');
    card2.removeClass('open show').addClass('match animated bounce');
    // reset the opened cards array
    openedCards = [];
    // add 1 in the matched cards counter
    matchedCards += 1;
    // execute the congrats function if matched all the cards
    if (matchedCards === 8) {
        congrats();
    };
};

/*
 * When someone choose 2 different cards, this function:
 *   - add the classes that makes an animation to show that unmatch
 *   - remove the classes that makes the card open and show
 *   - reset the opened cards array
 */
function unmatchCards(card1, card2) {
    // add the classes that makes an animation to show that unmatch
    card1.addClass('animated swing unmatch');
    card2.addClass('animated swing unmatch');
    // remove the classes that makes the card open and show
    setTimeout(function() {
        card1.removeClass('open show animated swing unmatch');
        card2.removeClass('open show animated swing unmatch');
    }, 900);
    // reset the opened cards array
    openedCards = [];
};

/*
 * When someone flip a card, this function:
 *   - check if the card already matched
 *   - add class open and show
 *   - add and remove a class of an animation
 */
function flipCard(card) {
    // check if the card already matched
    if (card.hasClass('match') === false) {
        // add class open and show
        // add and remove a class of an animation
        card.addClass('open show animated flipInX');
        setTimeout(function() {
            card.removeClass('animated flipInX');
        }, 700);
    };
};

/*
 * When someone open a card, this function:
 *   - add the card to the openedCards array
 *   - check if the array has 2 cards
 *   - if has 2 cards, execute the funcion newMove
 *   - execute the match cards if the cards match
 *   - execute the unmatch cards if the cards does not match
 */
function addOpenCard(card) {
    // add the card to the openedCards array
    openedCards.push(card);
    // check if the array has 2 cards
    if (openedCards.length === 2) {
        // if has 2 cards, execute the funcion newMove
        newMove();
        if (openedCards[0].children()[0].outerHTML === openedCards[1].children()[0].outerHTML) {
            // execute the match cards if the cards match
            matchCards(openedCards[0], openedCards[1]);
        } else {
            // execute the unmatch cards if the cards does not match
            unmatchCards(openedCards[0], openedCards[1]);
        };
    };
};

/*
 * Timer function from https://stackoverflow.com/a/19430505
 *   - control the timer, adding new seconds and minutes
 *   - shows the timer on the page
 */
var handler = function() {
    if (++sec === 60) {
        sec = 0;
        if (++min === 60) min = 0;
    }
    document.getElementById("time").innerHTML = (min < 10 ? "0" + min : min) + ":" + (sec < 10 ? "0" + sec : sec);
};

// When someone clicks the card, execute the flipCard and addOpenCard functions
cards.each(function() {
    $(this).click(function() {
        // checking if the card is not opened
        if ($(this)[0].className === 'card') {
            flipCard($(this));
            setTimeout(addOpenCard, 900, $(this));
        };
    });
});

// When someone clicks the restart button, execute the replacingCards function
$('.restart').click(function() {
    replacingCards(cards);
});

/*
 * When someone clicks the restart button on modal:
 *   - execute the replacingCards function
 *   - hide the modal
 */
// 
$('#modal-restart').click(function() {
    replacingCards(cards);
    $('#congrats-modal').modal('hide')
});

// To start the game, we create a new deck
replacingCards();

// To start the timer, we call the handler
setInterval(handler, 1000);
handler();