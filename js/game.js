const game = {
    canvas: undefined,
    ctx: undefined,
    width: undefined,
    heigth: undefined,
    fps: 60,
    framesCounter: 0,
    obstacles: [],
    alienCoin: [],
    keys: {
        ARROW_LEFT: 37,
        ARROW_RIGHT: 39,
        SHOOTING: 32,
    },
    score: 0,



    init: function () {
        this.canvas = document.getElementById("myCanvas");
        this.ctx = this.canvas.getContext('2d');
        this.width = window.innerWidth * 0.6;
        this.height = window.innerHeight * 0.98;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.start();

    },

    // setDimensions() {
    // document.getElementsByTagName("body")[0].style.margin = 0;
    //     this.wWidth = window.innerWidth;
    //     this.wHeight = window.innerHeight;
    //     this.canvasDom.setAttribute("height", this.wHeight);
    //     this.canvasDom.setAttribute("width", this.wWidth / 3);
    // },



    start() {
        this.reset()
        this.interval = setInterval(() => {
            this.framesCounter++;
            if (this.framesCounter > 1000) this.framesCounter = 0;
            this.clear()
            this.generateObstacles();
            this.generateAlienCoin();
            this.drawAll();
            this.moveAll();
            this.isColision2()
            this.isColision3();
            if (this.isColision()) {
                this.gameOver();

            };
            this.clearObstacles();
            this.clearAlienCoin();


        }, 1000 / this.fps);
    },

    reset() {
        this.background = new Background(this.ctx, this.width, this.height);
        this.AIplayer = new AIplayer(this.ctx, this.width, this.height, this.keys);
        this.scoreboard = ScoreBoard;
        this.scoreboard.init(this.ctx);
        this.score = 0;
        this.obstacles = [];
        this.alienCoin = [];
    },
    drawAll() {
        this.background.draw();
        this.AIplayer.draw();
        this.drawScore();
        this.obstacles.forEach(obs => obs.draw());
        this.alienCoin.forEach(coin => coin.draw());


    },


    moveAll() {

        this.background.move();
        this.obstacles.forEach(obs => obs.move());
        this.alienCoin.forEach(coin => coin.move());
        // this.aliensBolt.move();
        // this.AIplayer.move();

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
            console.log(idx)
        });
    },

    isColision() {

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




    isColision2() {

        for (let i = 0; i < this.obstacles.length; i++) {
            for (let j = 0; j < this.AIplayer.bullets.length; j++) {
                if (
                    this.obstacles[i].posY + this.obstacles[i].height >= this.AIplayer.bullets[j].posY &&
                    this.obstacles[i].posX + this.obstacles[i].width >= this.AIplayer.bullets[j].posX &&
                    this.obstacles[i].posX <= this.AIplayer.bullets[j].posX + this.AIplayer.bullets[j].width &&
                    this.obstacles[i].posY <= this.AIplayer.bullets[j].posY + this.AIplayer.bullets[j].height //Encima Bullet-debajo obstacles
                )
                    this.obstacles.splice(i, 1);

            }
        }
    },
    isColision3() {

        for (let i = 0; i < this.alienCoin.length; i++) {
            //for (let j = 0; j < this.AIplayer.bullets.length; j++) {
            if (
                this.alienCoin[i].posY + this.alienCoin[i].height >= this.AIplayer.posY &&
                this.alienCoin[i].posX + this.alienCoin[i].width >= this.AIplayer.posX &&
                this.alienCoin[i].posX <= this.AIplayer.posX + this.AIplayer.width &&
                this.alienCoin[i].posY <= this.AIplayer.posY + this.AIplayer.height
            )

                this.alienCoin.splice(i, 1);
            this.coinScore()

        }
    },

    drawScore() {
        //con esta funcion pintamos el marcador
        this.scoreboard.update(this.score);

    },
    coinScore() {
        this.score++
    },
    gameOver() {
        clearInterval(this.interval);

    }
}