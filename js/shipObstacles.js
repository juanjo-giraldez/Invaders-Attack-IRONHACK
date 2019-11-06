class shipObstacles {
    constructor(ctx, x, y, ) {
        this.ctx = ctx
        this.posX = x;
        this.posY = y;
        this.image = new Image();
        this.image.src = "img/ship.png";
        this.width = 30
        this.height = 50


        // this.posX = width / 2;
        // this.posY = this.height * 0.02;

        this.vx = 0.5; // 0.2;
    }

    draw() {

        this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height);

    }

    move() {
        this.posY += this.vx;
    }
}