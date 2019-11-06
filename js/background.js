class Background {
    constructor(ctx, width, height) {
        this.ctx = ctx;
        this.width = width;
        this.height = height;

        this.image = new Image();
        this.image.src = "img/bg5.png";

        this.posX = 0;
        this.posY = 0;

        this.vy = 2;

    }
    draw() {

        this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height);

        this.ctx.drawImage(this.image, this.posX, this.posY + this.height, this.width, this.height);

    }
    move() {
        this.posY -= this.vy
        if (this.posY <= -this.height) {
            this.posY = 0
        }
    }
}