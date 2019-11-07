const game = {
    canvas: undefined,
    ctx: undefined,
    width: undefined,
    height: undefined,
    fps: 60,
    framesCounter: 0,
    obstacles: [],
    alienCoin: [],
    coinEsmeralda: [],
    keys: {
        ARROW_LEFT: 37,
        ARROW_RIGHT: 39,
        SHOOTING: 32,
    },
    //time: 500,
    // score: 0,



    init: function () {
        this.canvas = document.getElementById("myCanvas");
        this.ctx = this.canvas.getContext('2d');
        this.width = window.innerWidth * 0.6;
        this.height = window.innerHeight * 0.98;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.start();

    },





    start() {
        this.reset()

        this.interval = setInterval(() => {
            this.time--
            this.framesCounter++;
            if (this.framesCounter > 1000) this.framesCounter = 0;
            this.clear()
            this.generateObstacles();
            this.generateAlienCoin();
            this.generateCoinEsmeralda();
            this.drawAll();
            this.moveAll();
            this.isColision1();
            this.isColision2();
            this.isColision3();
            this.isColision4();
            if (this.isColision()) {
                this.gameOver();
            };
            if (this.time === 0) {
                this.gameOver()
            }
            this.clearObstacles();
            this.clearAlienCoin();
            this.clearCoinEsmeralda();


        }, 1000 / this.fps);
    },

    reset() {
        this.background = new Background(this.ctx, this.width, this.height);
        this.AIplayer = new AIplayer(this.ctx, this.width, this.height, this.keys);
        this.scoreboard = ScoreBoard;
        this.scoreboard.init(this.ctx);
        this.score = 0;
        this.timer = TimerBoard;
        this.timer.init(this.ctx);
        this.time = 2812;
        this.obstacles = [];
        this.alienCoin = [];
        this.coinEsmeralda = [];
    },
    drawAll() {
        this.background.draw();
        this.AIplayer.draw();
        this.drawScore();
        this.drawTimer()
        this.obstacles.forEach(obs => obs.draw());
        this.alienCoin.forEach(coin => coin.draw());
        this.coinEsmeralda.forEach(coin => coin.draw());


    },


    moveAll() {

        this.background.move();
        this.obstacles.forEach(obs => obs.move());
        this.alienCoin.forEach(coin => coin.move());
        this.coinEsmeralda.forEach(coin => coin.move());



    },
    clear() {
        this.ctx.clearRect(0, this.height, this.width, this.height)
    },


    generateObstacles() {
        let random = Math.floor(Math.random() * this.canvas.width);
        if (this.framesCounter % 150 == 0) {
            this.obstacles.push(new shipObstacles(this.ctx, random, 0)) //pusheamos nuevos obstaculos
        }

    },
    clearObstacles() {
        this.obstacles.forEach((obs, idx) => {

            if (obs.posY <= this.heigth) {
                this.obstacles.splice(idx, 1);
            }
        });
    },

    generateAlienCoin() {
        let random = Math.floor(Math.random() * this.canvas.width);
        if (this.framesCounter % 200 == 0) {
            this.alienCoin.push(new alienCoin(this.ctx, random, 0)) //pusheamos nuevos alienCoin
        }

    },
    clearAlienCoin() {
        this.alienCoin.forEach((coin, idx) => {
            if (coin.posY <= this.heigth) {
                this.alienCoin.splice(idx, 1);
            }
        });
    },
    generateCoinEsmeralda() {
        let random = Math.floor(Math.random() * this.canvas.width);
        if (this.framesCounter % 300 == 0) {
            this.coinEsmeralda.push(new coinEsmeralda(this.ctx, random, 0)) //pusheamos nuevos coinElmeralda
        }

    },
    clearCoinEsmeralda() {
        this.coinEsmeralda.forEach((coin, idx) => {

            if (coin.posY <= this.heigth) {
                this.coinEsmeralda.splice(idx, 1);
            }

        });
    },

    isColision() { // colision con el player

        return this.obstacles.some(
            obs => {

                return (
                    this.AIplayer.posY <= obs.posY + obs.height && //Arriba
                    this.AIplayer.posY + this.AIplayer.height > obs.posY &&
                    this.AIplayer.posX <= obs.posX + obs.width && //su izquierda(AIplayer)
                    this.AIplayer.posX + this.AIplayer.width >= obs.posX // su derecha
                )

            })
    },

    isColision1() { //Colision de las naves con el limite de la pantalla inferior

        return this.obstacles.some(
            obs => {

                if (
                    this.height <= obs.posY + obs.height
                ) {
                    this.gameOver()
                }
            })
    },




    isColision2() { // Colision de las obstacles  con el player

        for (let i = 0; i < this.obstacles.length; i++) {
            for (let j = 0; j < this.AIplayer.bullets.length; j++) {
                if (
                    this.obstacles[i].posY + this.obstacles[i].height >= this.AIplayer.bullets[j].posY &&
                    this.obstacles[i].posX + this.obstacles[i].width >= this.AIplayer.bullets[j].posX &&
                    this.obstacles[i].posX <= this.AIplayer.bullets[j].posX + this.AIplayer.bullets[j].width &&
                    this.obstacles[i].posY <= this.AIplayer.bullets[j].posY + this.AIplayer.bullets[j].height //Encima Bullet-debajo obstacles
                ) {
                    this.obstacles.splice(i, 1);
                    this.coinShip();
                }

            }
        }
    },
    isColision3() { // Colision de las monedas doradas  con el player

        for (let i = 0; i < this.alienCoin.length; i++) {

            if (
                this.alienCoin[i].posY + this.alienCoin[i].height >= this.AIplayer.posY &&
                this.alienCoin[i].posX + this.alienCoin[i].width >= this.AIplayer.posX &&
                this.alienCoin[i].posX <= this.AIplayer.posX + this.AIplayer.width &&
                this.alienCoin[i].posY <= this.AIplayer.posY + this.AIplayer.height
            )

            {
                this.alienCoin.splice(i, 1);
                this.coinScore()
            }

        }
    },

    isColision4() {

        for (let i = 0; i < this.coinEsmeralda.length; i++) {

            if (
                this.coinEsmeralda[i].posY + this.coinEsmeralda[i].height >= this.AIplayer.posY &&
                this.coinEsmeralda[i].posX + this.coinEsmeralda[i].width >= this.AIplayer.posX &&
                this.coinEsmeralda[i].posX <= this.AIplayer.posX + this.AIplayer.width &&
                this.coinEsmeralda[i].posY <= this.AIplayer.posY + this.AIplayer.height
            )

            {

                this.coinEsmeralda.splice(i, 1);
                this.coinEsm()
            }

        }
    },

    drawScore() { // reflejamos el marcador en pantalla
        this.scoreboard.update(this.score);

    },
    drawTimer() { // reflejamos el marcador en pantalla
        this.timer.update(this.time);
    },

    coinShip() {
        this.score += 5
    },
    coinScore() {
        this.score += 10
    },
    coinEsm() {
        this.score += 25
    },

    // timer() {
    //     time = 45;
    //     this.ctx.font = "30px sans-serif"
    //     this.ctx.fillStyle = "white";
    //     this.ctx.fillText((time), 250, 50);
    //     console.log("ESTAMOS AQUI, YAY!!!!")

    //     this.interval = setInterval(function () {
    //         time--;
    //         if (time < 0)
    //             this.gameOver();
    //     }, 1000)
    // },


    gameOver() {
        clearInterval(this.interval);
        this.ctx.font = "100px sans-serif"
        this.ctx.fillStyle = "white";
        this.ctx.fillText(("GAME OVER"), this.width / 6.5, this.height / 2);

    }
}