const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Render = Matter.Render;
const Constraint = Matter.Constraint;
const Mouse = Matter.Mouse;
const MouseConstraint = Matter.MouseConstraint;

var bobObject1, bobObject2,bobObject3, bobObject4,bobObject5;
var roofObject;
var rope1,rope2,rope3, rope4,rope5;
var world;


function setup() {
	createCanvas(1280, 700);
	rectMode(CENTER);

	engine = Engine.create();
	world = engine.world;

	roofObject = new Roof(width/2, height/4, 260, 20);

	bobDiameter = 60;

	startBobPositionX = width/2;
	startBobPositionY = height/4 + 300;

	bobObject1 = new Pendulum(startBobPositionX - bobDiameter * 2, startBobPositionY, bobDiameter);
	bobObject2 = new Pendulum(startBobPositionX - bobDiameter, startBobPositionY, bobDiameter);
	bobObject3 = new Pendulum(startBobPositionX, startBobPositionY, bobDiameter);
	bobObject4 = new Pendulum(startBobPositionX + bobDiameter, startBobPositionY, bobDiameter);
	bobObject5 = new Pendulum(startBobPositionX + bobDiameter * 2, startBobPositionY, bobDiameter);

	var render = Render.create({
		element: document.body,
		engine: engine,
		options: {
			width: 1200,
			height: 700,
			wireframes: false
		}
	});

	let canvasmouse = Mouse.create(canvas.elt);
	canvasmouse.pixelRatio = pixelDensity();
	let options = {
		mouse: canvasmouse
	}
	mConstraint = MouseConstraint.create(engine, options);
	World.add(world, mConstraint);

	rope1 = new Sling(bobObject1.body, roofObject.body, -bobDiameter * 2, 0);
	rope2 = new Sling(bobObject2.body, roofObject.body, -bobDiameter * 1, 0);
	rope3 = new Sling(bobObject3.body, roofObject.body, 0, 0);
	rope4 = new Sling(bobObject4.body, roofObject.body, bobDiameter * 1, 0);
	rope5 = new Sling(bobObject5.body, roofObject.body, bobDiameter * 2, 0);

	//design
	tiny1 = ellipse(0, 0, 60, 60);

	//logs
	console.log(bobObject1.x);
	console.log(bobObject2.x);
	console.log(bobObject3.x);
	console.log(bobObject4.x);
	console.log(bobObject5.x);
	console.log(rope1);
	console.log(height/4);

	Engine.run(engine);
}


function draw() {
	rectMode(CENTER);
	background(0);

	bobObject1.display();
	bobObject2.display();
	bobObject3.display();
	bobObject4.display();
	bobObject5.display();

	rope1.display();
	rope2.display();
	rope3.display();
	rope4.display();
	rope5.display();


	fill("white");
	tiny1 = ellipse(520, 175, 5, 5);
	tiny2 = ellipse(580, 175, 5, 5);
	tiny3 = ellipse(640, 175, 5, 5);
	tiny4 = ellipse(700, 175, 5, 5);
	tiny5 = ellipse(760, 175, 5, 5);
}

function keyPressed() {
	if (keyCode === UP_ARROW) {
		Matter.Body.applyForce(bobObject1.body, bobObject1.body.position, {x: -50, y: -45});
	}
}


function drawLine(constraint){
	bobBodyPosition = constraint.bodyA.position
	roofBodyPosition = constraint.bodyB.position

	roofBodyOffset = constraint.pointB;
	
	roofBodyX = roofBodyPosition.x + roofBodyOffset.x
	roofBodyY = roofBodyPosition.y + roofBodyOffset.y
	line(bobBodyPosition.x, bobBodyPosition.y, roofBodyX, roofBodyY);
}

function mouseDragged() {
	Matter.Body.setPosition(bobObject1.body, {x: mouseX, y: mouseY});
}