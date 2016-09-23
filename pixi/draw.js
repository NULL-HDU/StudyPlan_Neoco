var Container = PIXI.Container,
  autoDetectRenderer = PIXI.autoDetectRenderer,
  Graphics = PIXI.Graphics,
  Text = PIXI.Text;

var globleX = window.innerWidth - 2,
  globleY = window.innerHeight - 2;

var stage = new Container(),
  renderer = autoDetectRenderer(globleX, globleY);
document.body.appendChild(renderer.view);

var rectangle = new Graphics();
rectangle.beginFill(0x66ccff);
rectangle.lineStyle(4, 0xff3300, 1);
rectangle.drawRect(200, 200, 100, 100);
rectangle.endFill();

var circle = new Graphics();
circle.beginFill(0x66ccff);
circle.drawCircle(200, 200, 20);
circle.endFill();

var ellipse = new Graphics();
ellipse.beginFill(0xFFFF00);
ellipse.drawEllipse(0, 0, 50, 20);
ellipse.endFill();
ellipse.x = 180;
ellipse.y = 130;
var roundBox = new Graphics();
roundBox.lineStyle(4, 0x99CCFF, 1);
roundBox.beginFill(0xFF9933);
roundBox.drawRoundedRect(0, 0, 84, 36, 10)
roundBox.endFill();
roundBox.x = 200;
roundBox.y = 200;

var line = new Graphics();
line.lineStyle(4, 0xFFFFFF, 1);
line.moveTo(0, 0);
line.lineTo(80, 50);
line.x = 32;
line.y = 32;

var triangle = new Graphics();
triangle.beginFill(0x66FF33);

//Use `drawPolygon` to define the triangle as
//a path array of x/y positions

triangle.drawPolygon([
    -32, 64,             //First point
    32, 64,              //Second point
    0, 0,
    100, 100  //Third point
]);

//Fill shape's color
triangle.endFill();

//Position the triangle after you've drawn it.
//The triangle's x/y position is anchored to its first point in the path
triangle.x = 180;
triangle.y = 22;

var message = new Text(
  "Hello Pixi!",
  {font: "32px sans-serif", fill: "white"}
);

message.position.set(200, 200);

stage.addChild(triangle);
stage.addChild(line);
stage.addChild(rectangle);
stage.addChild(circle);
stage.addChild(ellipse);
stage.addChild(message);
stage.addChild(roundBox);

renderer.render(stage);
