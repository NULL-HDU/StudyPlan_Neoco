// test
var Container = PIXI.Container,
  autoDetectRenderer = PIXI.autoDetectRenderer,
  loader = PIXI.loader,
  resources = PIXI.loader.resources,
  Sprite = PIXI.Sprite,
  Rectangle = PIXI.Rectangle,
  TextureCache = PIXI.utils.TextureCache;

var globleX = window.innerWidth - 2,
  globleY = window.innerHeight - 2;

var stage = new Container(),
  renderer = autoDetectRenderer(globleX, globleY);
document.body.appendChild(renderer.view);

loader
  // .add("images/cat.png")
  // .add("images/tileset.png")
  .add("images/treasureHunter.json")
  .on("progress", loadProgressHandler)
  .load(setup);


function loadProgressHandler(loader, resource) {
  console.log("loading:" + resource.url);
  console.log("Progress:" + loader.progress + "%");
}

function setup(){
  // var cat = new Sprite(resources["images/cat.png"].texture);
  // cat.position.set(globleX / 2, globleY /2);
  // cat.pivot.set(100, 100);
  // cat.rotation = 0;
  // stage.addChild(cat);

  // var texture = TextureCache["images/tileset.png"];
  // var rectangle = new Rectangle(192, 128, 64, 64);
  // texture.frame = rectangle;
  // var rocket = new Sprite(texture);
  // rocket.position.set(100, 100);
  // stage.addChild(rocket);

  var id = PIXI.loader.resources["images/treasureHunter.json"].textures;
  var dungeon = new Sprite(id["dungeon.png"]),
    treasure = new Sprite(id["treasure.png"]),
    explorer = new Sprite(id["explorer.png"]),
    door = new Sprite(id["door.png"]); 

  door.position.set(32, 0);
  explorer.x = 48;
  explorer.y = dungeon.height / 2 - explorer.height / 2;
  treasure.x = dungeon.width - treasure.width - 48;
  treasure.y = dungeon.height / 2 - treasure.height / 2;

  stage.addChild(dungeon);
  stage.addChild(explorer);
  stage.addChild(treasure);
  stage.addChild(door);

  var numberOfBlobs = 6,
    spacing = 48,
    xOffset= 150;

  for (let i = 0; i < numberOfBlobs; i ++) {
    var blob = new Sprite(id["blob.png"]);

    var x = spacing * i + xOffset;

    var y = randomInt(24, dungeon.height  - 48);

    blob.x = x;
    blob.y = y;

    stage.addChild(blob);
  }

  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  renderer.render(stage);
  console.log("setup");
}
