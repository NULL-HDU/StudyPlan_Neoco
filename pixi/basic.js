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

var explorer, state;

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
    door = new Sprite(id["door.png"]); 

  explorer = new Sprite(id["explorer.png"]);
  door.position.set(32, 0);
  explorer.x = 48;
  explorer.y = dungeon.height / 2 - explorer.height / 2;
  treasure.x = dungeon.width - treasure.width - 48;
  treasure.y = dungeon.height / 2 - treasure.height / 2;

  stage.addChild(dungeon);
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

  stage.addChild(explorer);

  var left = keyboard(37),
    up = keyboard(38),
    right = keyboard(39),
    down = keyboard(40);
    explorer.vx = 0;
    explorer.vy = 0;

  up.press = function() {
    explorer.vy = -5;
  }
  up.release = function() {
    if (down.isUp) {
      explorer.vy = 0;
    } else {
      down.press();
    }
  }
  down.press = function() {
    explorer.vy = 5;
  }
  down.release = function() {
    if (up.isUp) {
      explorer.vy = 0;
    } else {
      up.press();
    }
  }
  left.press = function() {
    explorer.vx = -5;
  }
  left.release = function() {
    if (right.isUp) {
      explorer.vx = 0;
    } else {
      right.press();
    }
  }
  right.press = function() {
    explorer.vx = 5;
  }
  right.release = function() {
    if (left.isUp) {
      explorer.vx = 0;
    } else {
      left.press();
    }
  }

  state = play;

  gameLoop();

}

function gameLoop() {
  
  requestAnimationFrame(gameLoop);

  state();

  renderer.render(stage);
}

function play() {
  explorer.x += explorer.vx;
  explorer.y += explorer.vy;
  // if (explorer.x >= 500) {
  //   explorer.x = 500;
  // }
}

function keyboard(keyCode) {
  var key = {};
  key.code = keyCode;
  key.isDown = false;
  key.isUp = true;
  key.press = undefined;
  key.release = undefined;
  //The `downHandler`
  key.downHandler = function(event) {
    if (event.keyCode === key.code) {
      if (key.isUp && key.press) key.press();
      key.isDown = true;
      key.isUp = false;

    }
    event.preventDefault();

  };
  //The `upHandler`
  key.upHandler = function(event) {
    if (event.keyCode === key.code) {
      if (key.isDown && key.release) key.release();
      key.isDown = false;
      key.isUp = true;

    }
    event.preventDefault();

  };
  //Attach event listeners
  window.addEventListener(
    "keydown", key.downHandler.bind(key), false

  );
  window.addEventListener(
    "keyup", key.upHandler.bind(key), false

  );
  return key;
}
