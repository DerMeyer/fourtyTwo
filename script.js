// construction

var grid = document.getElementById('grid');
var emptyField;
for (var a = 0; a < 42; a++) {
    emptyField = document.createElement('div');
    emptyField.classList.add('empty');
    emptyField.setAttribute('id', + a);
    grid.appendChild(emptyField);
}

let timeoutID,
    timeoutIDtwo;

// color switch

var shade;
var colorsOne = ['rgb(216, 221, 174)', 'rgb(21, 0, 45)'];
var colorsTwo = ['rgb(21, 0, 45)', 'rgb(216, 221, 174)'];

$('#setRGBOne').on('click', function() {
    colorsOne = randomRGB();
    $('#playerOne').css({
        'background-color': colorsOne[0],
        'border-color': colorsOne[1]
    });
});

$('#setRGBTwo').on('click', function() {
    if (!lock) {
        return;
    }
    colorsTwo = randomRGB();
    $('#playerTwo').css({
        'background-color': colorsTwo[0],
        'border-color': colorsTwo[1]
    });
});

function randomRGB() {
    var a = [];
    for (var i = 0; i < 3; i++) {
        a.push(Math.floor(Math.random() * 256));
    }
    shade = a.reduce((a, v) => a + v);
    return [`rgb(${a[0]}, ${a[1]}, ${a[2]})`, RGBcomplementary(a)];
}

function RGBcomplementary(rgb) {
    var a = [];
    for (var i = 0; i < 3; i++) {
        if (i === rgb.findIndex(e => e === Math.max(rgb[0], rgb[1], rgb[2]))) {
            a.push(0);
        } else {
            a.push(255 - rgb[i]);
        }
    }
    return `rgb(${a[0]}, ${a[1]}, ${a[2]})`;
}

// coat of arms switch

var coasBlack = ['gamble-black', 'burger-black', 'chinese-black', 'coin-black', 'dragon-black', 'robot-black', 'rocket-black', 'star-black', 'tiger-black', 'yinyang-black'];
var coasWhite = ['gamble-white', 'burger-white', 'chinese-white', 'coin-white', 'dragon-white', 'robot-white', 'rocket-white', 'star-white', 'tiger-white', 'yinyang-white'];

var defCoaOne = Math.floor(Math.random() * 10);
var defCoaTwo = Math.floor(Math.random() * 10);
var coaOne = `coatOfArms/${coasWhite[defCoaOne]}`;
var coaTwo = coasWhite[defCoaTwo];

var cOne = count(defCoaOne);
var cTwo = count(defCoaTwo);

$('#playerOne').css('background-image', 'url("' + coaOne + '.png")');
$('#playerTwo').css('background-image', 'url("coatOfArms/' + coaTwo + '.png")');

$('#coatOfArmsOne').on('click', function() {
    if (shade < 383) {
        coaOne = `coatOfArms/${coasWhite[cOne()]}`;
    } else {
        coaOne = `coatOfArms/${coasBlack[cOne()]}`;
    }
    console.log(coaOne);
    $('#playerOne').css('background-image', 'url("' + coaOne + '.png")');
});

$('#coatOfArmsTwo').on('click', function() {
    if (!lock) {
        return;
    }
    if (shade < 383) {
        coaTwo = coasWhite[cTwo()];
    } else {
        coaTwo = coasBlack[cTwo()];
    }
    $('#playerTwo').css('background-image', 'url("coatOfArms/' + coaTwo + '.png")');
});

function count(init) {
    var count = init + 1;
    return function() {
        if (count > 9) {
            count = 0;
        }
        return count++;
    }
}

// Launch

var lock;

$('#computer').on('click', () => {
    $('#data').toggleClass('hidden');
    $('#playerOne').toggleClass('hidden');
    coaOne = 'computer';
    colorsOne = ['red', 'white'];
    lock = true;
    shade = 382;
    launchOne();
});

$('#goOne').on('click', function() {
    lock = true;
    shade = 382;
    launchOne();
});

function launchOne() {
    console.log(coaOne);
    $('body').prepend('<style>.playerOne {background-image: url("' + coaOne + '.png"); background-color: ' + colorsOne[0] + '; border-color: ' + colorsOne[1] + ';}</style>');

    $('#coatOfArmsOne').css('transition-duration', '1s').css('top', '5.5vh');
    $('#setRGBOne').css('transition-duration', '1s').css('top', '5.5vh');
    $('#goOne').css('transition-duration', '1s').css('top', '5.5vh');

    $('.isLeft').addClass('hideArrow');
    $('.arrowLeft').css('grid-column', '1');
    $('.arrowRight').css('grid-column', '2 / 4');

    toggle = false;
}

$('#goTwo').on('click', function() {
    if (!lock) {
        return;
    }
    launchTwo();
});

function launchTwo() {
    $('body').prepend('<style>.playerTwo {background-image: url("coatOfArms/' + coaTwo + '.png"); background-color: ' + colorsTwo[0] + '; border-color: ' + colorsTwo[1] + ';}</style>');

    $('#coatOfArmsTwo').css('transition-duration', '1s').css('top', '5.5vh');
    $('#setRGBTwo').css('transition-duration', '1s').css('top', '5.5vh');
    $('#goTwo').css('transition-duration', '1s').css('top', '5.5vh');

    $('nav').css('height', '25vh');
    $('#tokenSlide > div').css('transform', 'translateX(1200%)');
    $('#overlay').css('opacity', '0');
    setTimeout(function() {
        $('#tokenSlide > div').addClass('playerTwo').css('transition-duration', '.5s').css('transform', 'translateX(-50%)');
        $('#overlay').css('left', '-100vw');
        setTimeout(function() {
            $('#tokenSlide > div').css('transition-duration', '0s');
            tokenBreath();
        }, 500);
    }, 1000);
}

$('#angelikiButton').on('click', function() {
    launchOne();
    launchTwo();
});

// event handling

var toggle = true;
var computer;

$('#computer').on('click', function() {
    computer ? computer = false : computer = true;
    if (computer) {
        $('#computer').css('background-color', 'red');
    } else {
        $('#computer').css('background-color', 'whitesmoke');
    }
})

$('#overlay').on('mouseover', function(e) {
    if (toggle && $(e.target).hasClass('isLeft')) {
        $(e.target).removeClass('hideArrow');
    } else if (!toggle && $(e.target).hasClass('isRight')) {
        $(e.target).removeClass('hideArrow');
    }
}).on('mouseout', function(e) {
    if (toggle && $(e.target).hasClass('isLeft')) {
        $(e.target).addClass('hideArrow');
    } else if (!toggle && $(e.target).hasClass('isRight')) {
        $(e.target).addClass('hideArrow');
    }
});

$('#gameZone').on('mouseover', function(e) {
        $('#tokenSlide > div').css('transition-duration', '0s');
}).on('mouseout', function(e) {
    $('#tokenSlide > div').css('transition-duration', '.3s');
    if (e.clientX < innerWidth / 2) {
        $('#tokenSlide > div').css('left', $('#tokenSlide > div').width() / 2 + 'px');
    } else {
        $('#tokenSlide > div').css('left', $('#tokenSlide').width() - $('#tokenSlide > div').width() / 2 + 'px');
    }
}).on('mousemove', function(e) {
    moveToken(e.clientX);
}).on('mousedown', function(e) {
    playToken(e);
});

$(document).on('keydown', function(e) {
    var leftProp = $('#tokenSlide > div').css('left');
    var leftX = Number(leftProp.slice(0, leftProp.length - 2));
    if (e.keyCode === 37 && leftX - $('#tokenSlide').width() / 7 > 0) {
        $('#tokenSlide > div').css('left', leftX - $('#tokenSlide').width() / 7 + 'px');
    } else if (e.keyCode === 39 && leftX + $('#tokenSlide').width() / 7 < $('#tokenSlide').width()) {
        $('#tokenSlide > div').css('left', leftX + $('#tokenSlide').width() / 7 + 'px');
    } else if (e.keyCode === 40 || e.keyCode === 13) {
        if (!lock) {
            lock = true;
            launchOne();
            launchTwo();
            return;
        }
        var slot = Math.floor(($('#tokenSlide > div').offset().left - $('#tokenSlide').offset().left) / ($('#tokenSlide').width() / 7) + .5);
        playToken(e, slot);
        e.preventDefault();
    }
});

// movement functions

function moveToken(x) {
    if (0 < x - $('#tokenSlide').offset().left && x - $('#tokenSlide').offset().left < $('#tokenSlide').width()) {
        $('#tokenSlide > div').css('left', x - $('#tokenSlide').offset().left + 'px');
    }
}

function playToken(e, slot) {
    toggle ? toggle = false : toggle = true;
    if (toggle) {
        $('#tokenSlide > div').removeClass('playerTwo');
    } else {
        $('#tokenSlide > div').removeClass('playerOne');
    }
    if (isNaN(slot)) {
        var slot = Number(e.target.id.slice(e.target.id.length - 1));
    }
    for (var i = 35 + slot; i >= 0 + slot; i -= 7) {
        if ($('#' + i).hasClass('empty')) {
            if (!toggle) {
                setToken(i % 7, i, 'playerOne');
                $('#tokenSlide > div').css('transform', 'translateX(1200%)');
                setTimeout(function() {
                    $('#tokenSlide > div').addClass('playerTwo').css('transition-duration', '.5s').css('transform', 'translateX(-50%)');
                    setTimeout(function() {
                        $('#tokenSlide > div').css('transition-duration', '0s');
                    }, 500);
                }, 300);
            } else {
                setToken(i % 7, i, 'playerTwo');
                $('#tokenSlide > div').css('transform', 'translateX(-1300%)');
                setTimeout(function() {
                    $('#tokenSlide > div').addClass('playerOne').css('transition-duration', '.5s').css('transform', 'translateX(-50%)');
                    setTimeout(function() {
                        $('#tokenSlide > div').css('transition-duration', '0s');
                    }, 500);
                }, 300);
            }
            return;
        }
    }
}

function setToken(start, end, player) {
    if (start < end) {
        $('#' + start).addClass(player).css('box-shadow', 'inset .3vh .3vh 1vh black');
        setTimeout(function() {
            $('#' + start).removeClass(player).css('box-shadow', 'inset 1vh 1vh 1vh gray');
            setToken(start += 7, end, player)
        }, 30);
    } else {
        memorize(end, player);
        $('#' + end).addClass(player).css('box-shadow', 'inset .3vh .3vh 1vh black').removeClass('empty');
        $('#grid').css('transform', 'translateY(1%)');
        setTimeout(function() {
            $('#grid').css('transform', 'translateY(0)');
            if (checkForVictory(end, player).includes(3)) {
                winner();
            }
            // hottestSlot(player);
        }, 150);
        if (computer) {
            setTimeout(function() {
                toggle && Rob();
            }, 300);
        }
    }
}

// Rob

function Rob() {
    var slot,
        slotP1 = hottestSlot('playerOne'),
        slotP2 = hottestSlot('playerTwo');

    if (slotP2[1] > slotP1[1]) {
        slot = slotP2[0];
    } else if (slotP2[2]) {
        slot = slotP2[0];
    } else {
        slot = slotP1[0];
    }
    if (!slot && slot !== 0) {
        slot = Math.floor(Math.random() * 7);
    }

    $('#choice').val(slot);
    setTimeout(() => playToken(0, slot), 1500);
}

function lookAhead() {

}

function hottestSlot(player) {
    let a = [],
        r,
        peak;

    for (let x = 0; x < 7; x++) {
        let c = 1;
        for (let i = 35 + x; i >= 0 + x; i -= 7) {
            if (c && $('#' + i).hasClass('empty')) {
                a.push(checkForVictory(i, player).reduce((a, v) => Math.max(a, v)));
                c--;
            }
        }
    }

    player === 'playerOne' ? $('#countOne').val(`${a}`) : $('#countTwo').val(`${a}`)

    peak = a.reduce((a, v) => Math.max(a, v));

    r = a.map((e, i) => e === peak
                        ? i
                        : -1
        ).filter(e => e > -1);

    player === 'playerOne' ? $('#peakOne').val(`${peak} / ${r}`) : $('#peakTwo').val(`${peak} / ${r}`)

    if (a.reduce((a, v) => Math.max(a, v)) > 2) {
        // console.log('flag ' + player);
        return [r[Math.floor(Math.random() * r.length)], peak, 1];
    }
    // console.log(`a ${player} looks like this: ${a}`);
    // console.log(`r ${player} looks like this: ${r}`);

    return [r[Math.floor(Math.random() * r.length)], peak, 0];
}

function checkForVictory(position, player) {
    let a = [];
    for (let x = 0; x < 7; x++) {
        for (let y = 0; y < 6; y++) {
            if ($('#' + (x + y * 7)).hasClass(player)) {
                a.push([x, y]);
            }
        }
    }

    let x = position % 7,
        y = (position - position % 7) / 7,

        top = gameData(x, y, 0, 1, a, 0),
        left = gameData(x, y, 1, 0, a, 0),
        right = gameData(x, y, -1, 0, a, 0),
        downRight = gameData(x, y, 1, 1, a, 0),
        downLeft = gameData(x, y, -1, 1, a, 0),
        upRight = gameData(x, y, 1, -1, a, 0),
        upLeft = gameData(x, y, -1, -1, a, 0);

    function gameData(x, y, xAdd, yAdd, a, c) {
        if (a.some(e => e[0] === x + xAdd && e[1] === y + yAdd)) {
            return gameData(x + xAdd, y + yAdd, xAdd, yAdd, a, c + 1);
        } else {
            return c;
        }
    }
    return [top, left, right, downRight, downLeft, upRight, upLeft, left + right, downRight + upLeft, downLeft + upRight];
}

// learning

function recall() {

}

var memorize = memory();
function memory() {
    var playerOne = [];
    var playerTwo = [];
    return function(end, player) {
        if (player === 'playerOne') {
            playerOne += end + ' ';
        } else if (player === 'playerTwo') {
            playerTwo += end + ' ';
        }
        return [playerOne, playerTwo];
    }
}

var LTMemory = longTermMemory();

function longTermMemory() {
    try {
        var LTMemory = JSON.parse(localStorage.getItem('memories'));
    } catch(err) {
        console.log(err);
    }
    return LTMemory;
}

function rememberLongTerm(store) {
        try {
            localStorage.setItem('memories', JSON.stringify(store));
        } catch (err) {
            console.log(err);
        }
}

// animation

function tokenBreath() {
    if (toggle) {
        $('#playerOne').css('transform', 'scale(1.2, 1.2)');
        timeoutID = setTimeout(function() {
            $('#playerOne').css('transform', 'scale(1, 1)');
            timeoutIDtwo = setTimeout(function() {
                tokenBreath();
            }, 1000);
        }, 1000);
    } else {
        $('#playerTwo').css('transform', 'scale(1.2, 1.2)');
        timeoutID = setTimeout(function() {
            $('#playerTwo').css('transform', 'scale(1, 1)');
            timeoutIDtwo = setTimeout(function() {
                tokenBreath();
            }, 1000);
        }, 1000);
    }
}

setTimeout(function() {
    tokenBreath();
}, 300);

function winner() {
    clearTimeout(timeoutID);
    clearTimeout(timeoutIDtwo);
    if (!toggle) {
        $('#playerOne').css('z-index', '125').css('transition', 'transform 10s linear 0s').css('transform', 'scale(20, 20)');
    } else {
        $('#playerTwo').css('z-index', '125').css('transition', 'transform 10s linear 0s').css('transform', 'scale(20, 20)');
    }
    var store = memorize();
    console.log(store);
    rememberLongTerm(store);
    setTimeout(function() {
        location.reload();
    }, 10000);
}
