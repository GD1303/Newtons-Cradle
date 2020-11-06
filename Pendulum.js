class Pendulum {
	constructor(x, y) {
        var options = {
            restitution: 1,
            friction: 1,
            frictionAir: 0.0,
            slop: 1,
            inertia: Infinity,
            isStatic: false
        }
        this.body = Bodies.rectangle(x, y, 60, 60, options);
        this. x = x;
        this.y = y;

        World.add(world, this.body);
    }
    display() {
        var angle = this.body.angle;
        var pos = this.body.position;

        push();
        translate(pos.x, pos.y);
        rotate(angle);
        strokeWeight(1);
        stroke("white");
        fill("black");
        ellipse(0, 0, 60, 60);
        pop();
    }

}