class AIplayer {
    constructor(ctx, width, height, keys) {
        this.ctx = ctx;
        this.width = 80;
        this.height = 60;

        this.image = new Image();
        this.image.src = "img/alienInvaders1.png";

        this.posX = width / 2;
        this.posY = height * 0.90;

        this.vx = 20;
        this.keys = keys;
        this.bullets = [];
        this.setListeners();

    }

    draw() {
        this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height);
        this.bullets.forEach(bullet => bullet.draw());
        this.bullets.forEach(bullet => bullet.move());

    }

    move() {

    }

    setListeners() {
        document.onkeydown = e => {
            console.log("hola, holita")
            switch (e.keyCode) {
                case this.keys.ARROW_LEFT:
                    // this.posX = this.width ? this.posX -= this.vx : null;
                    this.posX -= this.vx;
                    break;
                case this.keys.ARROW_RIGHT:
                    this.posX += this.vx;
                    break;
                case this.keys.SHOOTING:
                    this.shoot();
                    break;
            }
        }
    }

    shoot() {

        this.bullets.push(new Bullet(this.ctx, this.posX, this.posY, this.width, this.height));
    }

    isCollision() {

        return this.bullets.some(
            obs => {
                // console.log(obs)
                return (
                    this.shipObstacles.posY + this.shipObstacles.height <= obs.posY //&& //Arriba
                    // this.shipObstacles.posX <= obs.posX + obs.width && //su izquierda(AIplayer)
                    // this.shipObstacles.posX + this.shipObstacles.width >= obs.posX // su derecha
                )

            })
    }

}