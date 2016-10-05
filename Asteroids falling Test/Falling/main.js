function stars() {
  canvas = document.getElementById("can");
  if (canvas.getContext) {
    ctx = canvas.getContext("2d");
    ctx.fillStyle = "black";
    ctx.rect(0, 0, 480, 640);
    ctx.fill();
    starfield();
  }
}
// Create random stars with random velocity.
var starList = []

function starfield() {
  for (i = 0; i < 20; i++) {
    var star = {
      x: Math.floor(Math.random() * 399),
      y: Math.floor(Math.random() * 399),
      vx: Math.ceil(Math.random() * 10)
    };
    starList.push(star);
  }
}

function run() {
  // Register for the next frame
  window.requestAnimationFrame(run);

  // Reset the canvas
  ctx.fillStyle = "black";
  ctx.rect(0, 0, 480, 640);
  ctx.fill();

  // Update position and draw each star.
  var star;
  for (var i = 0, j = starList.length; i < j; i++) {
    star = starList[i];
    star.x = star.x - star.vx;
    // Little bonus, also reset y and vx
    if (star.x < 0) {
      star.x = 400;
      star.y = Math.floor(Math.random() * 400);
      star.vx = Math.ceil(Math.random() * 10);
    }
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(star.x, star.y, 3, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
  }
}

stars();
run();