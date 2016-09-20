// var stage = new PIXI.Container(),
//   renderer = PIXI.autoDetectRenderer(256, 256);
// document.body.appendChild(renderer.view);
// 
// PIXI.loader
//   .add("img/badguy.png")
//   .load(setup);
// 
// function setup() {
//   var cat = new PIXI.Sprite( PIXI.loader.resources["img/badguy.png"].texture);
// 
//   stage.addChild(cat);
// 
//   renderer.render(stage);
// }
//
// pixi.min.js
var Container = PIXI.Container,
  autoDetectRenderer = PIXI.autoDetectRenderer,
  loader = PIXI.loader,
  resources = PIXI.loader.resources,
  Sprite = PIXI.Sprite;
var TextureCache = PIXI.utils.TextureCache;

var globleX = window.innerWidth - 2,
  globleY = window.innerHeight - 2;

var stage = new Container(),
  renderer = autoDetectRenderer(window.innerWidth - 2, window.innerHeight - 2);
document.body.appendChild(renderer.view);

loader
  .add("images/cat.png")
  .add("images/tileset.png")
  .on("progress", loadProgressHandler)
  .load(setup);

function loadProgressHandler(loader, resource) {
  console.log("loading:" + resource.url);
  console.log("Progress:" + loader.progress + "%");
}

function setup(){
  var cat = new Sprite(resources["images/cat.png"].texture);
  cat.position.set(globleX / 2, globleY /2);
  cat.pivot.set(100, 100);
  cat.rotation = 0;
  stage.addChild(cat);

  var texture = TextureCache["images/tileset.png"];
  var rectangle = new PIXI.Rectangle(96, 64,32, 32);
  texture.frame = rectangle;
  var rocket = new Sprite(texture);
  rocket.position.set(100, 100);
  stage.addChild(rocket);

  renderer.render(stage);
  console.log("setup");
}
