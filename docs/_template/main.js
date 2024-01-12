const G = {
	WIDTH: 100,
	HEIGHT: 150,
  STAR_SPEED_MIN: 0.5,
	STAR_SPEED_MAX: 1.0,
  PLAYER_FIRE_RATE: 5,
  PLAYER_GUN_OFFSET: 3,
  FBULLET_SPEED: 2,
};
title = "cooloo";

description = `this is my word
`;

characters = [];

options = {
  viewSize: {x: G.WIDTH, y: G.HEIGHT}
};


let stars;
let player;
let fBullets;

player = {
  pos: vec(G.WIDTH * 0.5, G.HEIGHT * 0.5),
  firingCooldown: G.PLAYER_FIRE_RATE,
  isFiringLeft: true,
};
fBullets = []

stars = times(20, () => {
  const posX = rnd(0, G.WIDTH);
  const posY = rnd(0, G.HEIGHT);
  return {
    pos: vec(posX, posY),
    // More RNG
    speed: rnd(G.STAR_SPEED_MIN, G.STAR_SPEED_MAX)
  };
});

function update () {
  if (!ticks) {
  }

  // stars.forEach((s) => {
  //   s.pos.y += s.speed;
  //   // s.pos.wrap(0, G.WIDTH, 0, G.HEIGHT);
  //   if (s.pos.y > G.HEIGHT) {
  //     s.pos.x = rnd(0, G.WIDTH);
  //     s.pos.y = 0;
  //   }
  //   color("light_black");
  //   box(s.pos, 2);
  // });

  

  player.pos = vec(input.pos.x, input.pos.y);
  player.pos.clamp(0, G.WIDTH, 0, G.HEIGHT);
  // player.firingCooldown--;

  // if (player.firingCooldown <= 0) {
  //   fBullets.push({
  //     pos: vec(player.pos.x, player.pos.y)
  //   });
  //   player.firingCooldown = G.PLAYER_FIRE_RATE;
  // }
  color("red");
  box(player.pos, 4);
  // char("a", player.pos);
  
  // fBullets.forEach((fb) => {
  //   fb.pos.y -= G.FBULLET_SPEED;
  //   color("yellow");
  //   box(fb.pos, 2);
  // });

  // text(fBullets.length.toString(), 3, 10);

  // remove(fBullets, (fb) => {
  //   return fb.pos.y < 0;
  // });

  remove(stars, (s) => {
    s.pos.y += s.speed;    
    if (s.pos.y > G.HEIGHT) {
      s.pos.x = rnd(0, G.WIDTH);
      s.pos.y = 0;
    }
    color("light_black");
    // box(s.pos, 2);

    let flag = box(s.pos, 2).isColliding.rect.red
    if (flag) {
      color('yellow');
      particle(s.pos);
      const posX = rnd(0, G.WIDTH);
      stars.push({
        pos: vec(posX, 0),
        speed: rnd(G.STAR_SPEED_MIN, G.STAR_SPEED_MAX)
      })
      addScore(1)
      if (score % 10 === 0) {
        G.STAR_SPEED_MIN += 0.5
        G.STAR_SPEED_MAX += 0.5
      }
      if(score >= 100) {
        complete()
      }
      return true
    }
    
    return false
  })
}
