class AIplayer {
    constructor(ctx, width, height, keys) {
        this.ctx = ctx;
        this.width = 80;
        this.height = 60;

        this.image = new Image();
        this.image.src = "img/alienInvaders1.png";

        this.posX = 390; 
        this.posY = height * 0.90;

        this.vx = 50;
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
            switch (e.keyCode) {
                case this.keys.ARROW_LEFT:
                    this.posX >= 35 ? this.posX -= this.vx : null
                   
                    break;
                case this.keys.ARROW_RIGHT:
                    this.posX <= 781 ? this.posX += this.vx : null
                    
                    break;
                case this.keys.SHOOTING:
                    this.shoot();
                    break;
            }
        }
    }

    shoot() {
        this.bullets.push(new Bullet(this.ctx, this.posX, this.posY, this.width, this.height));
        let bulletsSound = document.createElement("audio")
        bulletsSound.src = "audio/NFF-laser-gun-02.wav"
        bulletsSound.volume = .04
        bulletsSound.play()
    }

    

}