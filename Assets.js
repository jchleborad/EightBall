let sprites = {};
let assetsStillLoading = 0;

function assetsLoadingLoop(callback) {

    if (assetsStillLoading) {
        requestAnimationFrame(assetsLoadingLoop.bind(this, callback));
    } else {
        callback();
    }

}

function loadAssets(callback) {

    function loadSprite(fileName) {
        assetsStillLoading++;

        let spriteImage = new Image();
        spriteImage.src = "./assets/sprites/" + fileName

        spriteImage.onload = function () {
            assetsStillLoading--;
        }

        return spriteImage;
    }
    sprites.background = loadSprite('spr_background5.png')
    sprites.stick = loadSprite('spr_stick.png');
    sprites.whiteBall = loadSprite('spr_whiteBall.png');
    sprites.redBall = loadSprite('spr_redBall2.png');
    sprites.yellowBall = loadSprite('spr_yellowBall2.png');
    sprites.blackBall = loadSprite('spr_blackBall2.png');
    sprites.tenBall = loadSprite('spr_tenBaLL.png');
    sprites.nineBall = loadSprite('spr_nineBaLL.png');
    sprites.eightBall = loadSprite('spr_eightBaLL.png');
    sprites.fourteenBall = loadSprite('spr_fourteenBaLL.png');
    sprites.oneBall = loadSprite('spr_oneBaLL.png');



    assetsLoadingLoop(callback);
}

function getBallSpriteByColor(color) {
    switch (color) {

        case COLOR.RED:
            return sprites.redBall
        case COLOR.YELLOW:
            return sprites.yellowBall
        case COLOR.BLACK:
            return sprites.blackBall
        case COLOR.WHITE:
            return sprites.whiteBall
        case COLOR.TEN:
            return sprites.tenBall
        case COLOR.NINE:
            return sprites.nineBall
        case COLOR.EIGHT:
            return sprites.eightBall
        case COLOR.FOURTEEN:
            return sprites.fourteenBall
        case COLOR.ONE:
            return sprites.oneBall
    }
}