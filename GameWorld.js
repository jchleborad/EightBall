//DELTA finds how much of the ball's velocity to be added to the
//ball's position at each iteration of the main loop
const DELTA = 1/177;

function GameWorld() {

    this.balls= [
        [new Vector2(1025,418),COLOR.ONE],//1 1022, 413
        [new Vector2(1056, 433), COLOR.RED], //3
        [new Vector2(1056, 393), COLOR.YELLOW],//2
        [new Vector2(1090, 452), COLOR.YELLOW], //6
        [new Vector2(1096, 420), COLOR.EIGHT], //5 1090, 413
        [new Vector2(1090, 374), COLOR.RED], //4
        [new Vector2(1126, 472), COLOR.YELLOW], //10
        [new Vector2(1126, 393), COLOR.RED], //8
        [new Vector2(1126, 354), COLOR.BLACK], //7
        [new Vector2(1126, 433), COLOR.BLACK], //9
        [new Vector2(1162, 335), COLOR.RED], //11
        [new Vector2(1162, 374), COLOR.YELLOW], //12
        [new Vector2(1162, 413), COLOR.YELLOW], //13
        [new Vector2(1162, 452), COLOR.RED], //14
        [new Vector2(1162, 491), COLOR.YELLOW], //15
        [new Vector2(413, 413), COLOR.WHITE], //Cue Ball
    ].map(params => new Ball(params[0], params[1]))

    this.whiteBall = this.balls[this.balls.length - 1];

    this.stick = new Stick(
        new Vector2(413, 413),
         this.whiteBall.shoot.bind(this.whiteBall)
        );

        this.table = {
            TopY: 57,
            RightX: 1443,
            BottomY: 768,
            LeftX: 57
        }

}

GameWorld.prototype.handleCollisions = function() {
    
    for (let i = 0 ; i < this.balls.length ; i++ ) {
        this.balls[i].collideWith(this.table);
        for(let j = i + 1 ; j < this.balls.length ; j++) {
            const firstBall = this.balls[i];
            const secondBall = this.balls[j];
            firstBall.collideWith(secondBall);
        }
    }
}

GameWorld.prototype.update = function() {

    this.handleCollisions();

    this.stick.update();
    
    for(let i = 0 ; i < this.balls.length ; i++) {
        this.balls[i].update(DELTA);
    }

    if(!this.ballsMoving() && this.stick.shot) {
        this.stick.reposition(this.whiteBall.position);
    }

}

GameWorld.prototype.draw = function() {

    Canvas.drawImage(sprites.background, {x:0, y:0});
    
    for (let i = 0; i < this.balls.length ; i++) {
        this.balls[i].draw();
    }
    
    this.stick.draw();
}

GameWorld.prototype.ballsMoving = function() {
    
    let ballsMoving = false;

    for( let i = 0 ; i < this.balls.length ; i++ ) {
        if(this.balls[i].moving){
            ballsMoving = true;
            break;
        }
    }

    return ballsMoving;
}