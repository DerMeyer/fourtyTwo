// construction

var grid = document.getElementById('grid');
var emptyField;
for (var a = 0; a < 42; a++) {
    emptyField = document.createElement('div');
    emptyField.classList.add('empty');
    emptyField.setAttribute('id', + a);
    grid.appendChild(emptyField);
}

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
var coaOne = coasBlack[defCoaOne];
var coaTwo = coasWhite[defCoaTwo];

var cOne = count(defCoaOne);
var cTwo = count(defCoaTwo);

$('#playerOne').css('background-image', 'url("coatOfArms/' + coaOne + '.png")');
$('#playerTwo').css('background-image', 'url("coatOfArms/' + coaTwo + '.png")');

$('#coatOfArmsOne').on('click', function() {
    if (shade < 383) {
        coaOne = coasWhite[cOne()];
    } else {
        coaOne = coasBlack[cOne()];
    }
    $('#playerOne').css('background-image', 'url("coatOfArms/' + coaOne + '.png")');
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

$('#goOne').on('click', function() {
    lock = true;
    shade = 382;
    launchOne();
});

function launchOne() {
    $('body').prepend('<style>.playerOne {background-image: url("coatOfArms/' + coaOne + '.png"); background-color: ' + colorsOne[0] + '; border-color: ' + colorsOne[1] + ';}</style>');

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
        console.log('Mouse!');
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
        $('#' + end).addClass(player).css('box-shadow', 'inset .3vh .3vh 1vh black').removeClass('empty');

        $('#grid').css('transform', 'translateY(1%)');
        setTimeout(function() {
            $('#grid').css('transform', 'translateY(0)');
            checkForVictory(end, player);
        }, 150);
    }
}

var timeoutID;
var timeoutIDtwo;

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
    setTimeout(function() {
        location.reload();
    }, 10000);
}

// AI

function checkForVictory(position, player) {
    var a = [];
    for (var x = 0; x < 7; x++) {
        for (var y = 0; y < 6; y++) {
            if ($('#' + (x + y * 7)).hasClass(player)) {
                a.push([x, y]);
            }
        }
    }
    var top = fromTop(position % 7, (position - position % 7) / 7 + 1, 0, a);
    var left = fromLeft(position % 7 + 1, (position - position % 7) / 7, 0, a);
    var right = fromRight(position % 7 - 1, (position - position % 7) / 7, 0, a);

    var downRight = fromLeftTop(position % 7 + 1, (position - position % 7) / 7 + 1, 0, a);
    var downLeft = fromRightTop(position % 7 - 1, (position - position % 7) / 7 + 1, 0, a);
    var upRight = fromLeftBottom(position % 7 + 1, (position - position % 7) / 7 - 1, 0, a);
    var upLeft = fromRightBottom(position % 7 - 1, (position - position % 7) / 7 - 1, 0, a);

    if (left + right > 2 || downRight + upLeft > 2 || downLeft + upRight > 2) {
        winner();
    }
}

function fromTop(x, y, c, a) {
    if (c > 2) {
        winner();
    } else if (a.some(function(e) {
        return e[0] === x && e[1] === y;
    })) {
        return fromTop(x, y + 1, c + 1, a);
    } else {
        return c;
    }
}

function fromLeft(x, y, c, a) {
    if (c > 2) {
        winner();
    } else if (a.some(function(e) {
        return e[0] === x && e[1] === y;
    })) {
        return fromLeft(x + 1, y, c + 1, a);
    } else {
        return c;
    }
}

function fromRight(x, y, c, a) {
    if (c > 2) {
        winner();
    } else if (a.some(function(e) {
        return e[0] === x && e[1] === y;
    })) {
        return fromRight(x - 1, y, c + 1, a);
    } else {
        return c;
    }
}

function fromLeftTop(x, y, c, a) {
    if (c > 2) {
        winner();
    } else if (a.some(function(e) {
        return e[0] === x && e[1] === y;
    })) {
        return fromLeftTop(x + 1, y + 1, c + 1, a);
    } else {
        return c;
    }
}

function fromRightTop(x, y, c, a) {
    if (c > 2) {
        winner();
    } else if (a.some(function(e) {
        return e[0] === x && e[1] === y;
    })) {
        return fromRightTop(x - 1, y + 1, c + 1, a);
    } else {
        return c;
    }
}

function fromLeftBottom(x, y, c, a) {
    if (c > 2) {
        winner();
    } else if (a.some(function(e) {
        return e[0] === x && e[1] === y;
    })) {
        return fromLeftBottom(x + 1, y - 1, c + 1, a);
    } else {
        return c;
    }
}

function fromRightBottom(x, y, c, a) {
    if (c > 2) {
        winner();
    } else if (a.some(function(e) {
        return e[0] === x && e[1] === y;
    })) {
        return fromRightBottom(x - 1, y - 1, c + 1, a);
    } else {
        return c;
    }
}
