kaboom({
  global: true,
  fullscreen: true,
  scale: 1.5,
  debug: true,
  clearColor: [0, 0, 0, 1],
});

loadRoot("https://i.imgur.com/");
loadSprite("coin", "wbKxhcd.png");
loadSprite("evil-shroom", "KPO3fR9.png");
loadSprite("brick", "pogC9x5.png");
loadSprite("block", "M6rwarW.png");
loadSprite("mario", "Wb1qfhK.png");
loadSprite("mushroom", "0wMd92p.png");
loadSprite("surprise", "gesQ1KP.png");
loadSprite("unboxed", "bdrLpi6.png");
loadSprite("pipe-top-left", "ReTPiWY.png");
loadSprite("pipe-top-right", "hj2GK4n.png");
loadSprite("pipe-bottom-left", "c1cYSbt.png");
loadSprite("pipe-bottom-right", "nqQ79eI.png");

loadSprite("blue-block", "fVscIbn.png");
loadSprite("blue-brick", "3e5YRQd.png");
loadSprite("blue-steel", "gqVoI2b.png");
loadSprite("blue-evil-shroom", "SvV4ueD.png");
loadSprite("blue-surprise", "RMqCc1G.png");

scene("game", () => {
  gravity(2000);

  const mario = add([sprite("mario"), pos(80, 40), area(), body()]);

  const ground = add([
    rect(width(), 48),
    pos(0, height() - 48),
    outline(1),
    area(),
    solid(),
    color(127, 200, 255),
  ]);

  const jump = () => {
    if (mario.isGrounded()) {
      mario.jump();
    }
  };

  onKeyPress("space", jump);

  mario.onCollide("tree", () => {
    addKaboom(mario.pos);
    shake();
    go("lose");
  });

  (function spawnTree() {
    add([
      rect(48, rand(24, 64)),
      area(),
      outline(4),
      pos(width(), height() - 48),
      origin("botleft"),
      color(255, 180, 255),
      move(LEFT, rand(150, 600)),
      "tree",
    ]);
    wait(rand(0.5, 1.5), () => {
      spawnTree();
    });
  })();

  let score = 0;
  const scoreLabel = add([text(score), pos(24, 24)]);
  onUpdate(() => {
    score++;
    scoreLabel.text = score;
  });
});

go("game");

scene("lose", () => {
  add([text("Game Over"), pos(center()), origin("center")]);
});
