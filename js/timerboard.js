const TimerBoard = {
    ctx: undefined,

    init: function (ctx) {
        this.ctx = ctx
        this.ctx.font = "30px sans-serif"
    },

    update: function (time) {


        this.ctx.fillStyle = "white";
        this.ctx.fillText("COUNTDOWN", 525, 50);
        this.ctx.fillText((time), 775, 50);
    }
};