export function draw(ctx, pxs, cfg) {
  const { width, height } = cfg;
  return function() {
    ctx.clearRect(0, 0, width, height);
    for(var i = 0; i < pxs.length; i++) {
      pxs[i].fade();
      pxs[i].move();
      pxs[i].draw();
    }
  }
}

export class Fly {
  constructor(context, redrawInterval, cfg) {
    this.cfg = cfg;
    this.context = context;
    this.redrawInterval = redrawInterval;
    this.s = {
      ttl:8000,
      xmax:5,
      ymax:2,
      rmax:10,
      rt:1,
      xdef:960,
      ydef:540,
      xdrift:4,
      ydrift: 4,
      random:true,
      blink:true,
    };
  }

	reset() {
		this.x = (this.s.random ? this.cfg.width*Math.random() : this.s.xdef);
		this.y = (this.s.random ? this.cfg.height*Math.random() : this.s.ydef);
		this.r = ((this.s.rmax-1)*Math.random()) + 10;
		this.dx = (Math.random()*this.s.xmax) * (Math.random() < .5 ? -1 : 1);
		this.dy = (Math.random()*this.s.ymax) * (Math.random() < .5 ? -1 : 1);
		this.hl = (this.s.ttl/this.redrawInterval)*(this.r/this.s.rmax);
		this.rt = Math.random()*this.hl;
		this.s.rt = Math.random()+1;
		this.stop = Math.random()*.2+.4;
		this.s.xdrift *= Math.random() * (Math.random() < .5 ? -1 : 1);
		this.s.ydrift *= Math.random() * (Math.random() < .5 ? -1 : 1);
	}

	fade() {
		this.rt += this.s.rt;
	}

	draw() {
		if(this.s.blink && (this.rt <= 0 || this.rt >= this.hl)) this.s.rt = this.s.rt*-1;
		else if(this.rt >= this.hl) this.reset();
		var newo = 1-(this.rt/this.hl);
		this.context.beginPath();
		this.context.arc(this.x,this.y,this.r,0,Math.PI*2,true);
		this.context.closePath();
		var cr = this.r*newo;
		const g = this.context.createRadialGradient(this.x, this.y, 0, this.x, this.y, (cr <= 0 ? 1 : cr));
		g.addColorStop(0.0, 'rgba(238,255,255,'+newo+')');
		g.addColorStop(this.stop, 'rgba(238,225,28,'+(newo*.2)+')');
		g.addColorStop(1.0, 'rgba(238,180,228,0)');
		this.context.fillStyle = g;
		this.context.fill();
	}

	move() {
		this.x += (this.rt/this.hl)*this.dx;
		this.y += (this.rt/this.hl)*this.dy;
		if(this.x > this.cfg.width || this.x < 0) this.dx *= -1;
		if(this.y > this.cfg.height || this.y < 0) this.dy *= -1;
	}

	getX() { return this.x; }
	getY() { return this.y; }
}